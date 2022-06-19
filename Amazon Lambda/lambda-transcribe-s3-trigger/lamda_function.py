'''
    Función Lambda: lambda-transcribe-s3-trigger
    lamda_function.py

    Main Author:
    - Erick Bustos.
    
    RDS Related Code Co-authors:
    
    - Diego Juárez.
    - Luis Zamarripa.
    - Jacqueline Zavala.
    

    Creation date: 20/04/2022
    Last modification date: 01/06/2022

    Program that acts as a trigger in the S3 that stores the audio recordings from Amazon Connect.
    It performs the following actions:
        1) Copy the object to another S3 (where it will be matched and merged with its corresponding screen recording)
        2) Get already existent call information from Amazon Connect using the Amazon SDK for Python.
        3) Register the call in both our MySQL (RDS) database, and in DynamoDB
        4) Send the audio file to Amazon Transcribe to perform a call Analytics Job
        5) Send the audio file to Amazon Transcribe to extract a vtt subtitles file

'''

import boto3
import urllib.parse
import pymysql
import pytz
import sys
import os
import json
from datetime import date


transcribe = boto3.client('transcribe', 'us-west-2')
s3 = boto3.client('s3', 'us-west-2')
connect = boto3.client('connect', 'us-west-2')

def start_transcribe_job(s3bucket,s3object,job_name):
    """
    Start an Amazon Trascribe Call Analytics Job using the audio recording.
        s3bucket (str): Name of the bucket where the object will be stored
        s3object (str): S3 Key of the object
        job_name (str): Name that the job will get (contact id)
    """
    # Build URI of the recording that is going to be processed
    job_uri = f's3://{s3bucket}/{s3object}'
    
    # Transcribe job output location
    output_location = "s3://transcribe-job-results-group1/JobResults/"
    
    # Role to create the transcript operation
    data_access_role = "arn:aws:iam::559202700801:role/service-role/AmazonTranscribeServiceRole-TranscribeAccessRole"
    
    # Execute Transcribe Call Analytics Job
    result = transcribe.start_call_analytics_job(
             CallAnalyticsJobName=job_name,
             Media={
                'MediaFileUri': job_uri
             },
             DataAccessRoleArn=data_access_role,
             OutputLocation=output_location,
             ChannelDefinitions=[
                {
                    'ChannelId': 1, 
                    'ParticipantRole': 'AGENT'
                },
                {
                    'ChannelId': 0, 
                    'ParticipantRole': 'CUSTOMER'
                }
             ]
     )

def create_subtitles_transcript(s3bucket,s3object,job_name):
    """
    Start an Amazon Trascribe Job using the audio recording to extract a .vtt subtitles file.
        s3bucket (str): Name of the bucket where the object will be stored
        s3object (str): S3 Key of the object
        job_name (str): Name that the job will get (contact id)
    """
    
    # Build URI of the recording that is going to be processed
    job_uri = f's3://{s3bucket}/{s3object}'
    
    transcribe.start_transcription_job(
        TranscriptionJobName = job_name,
        Media = {
            'MediaFileUri': job_uri
        },
        OutputBucketName = 'final-recordings',
        OutputKey = 'subtitles/', 
        LanguageCode = 'en-US', 
        Subtitles = {
            'Formats': [
                'vtt'
            ]
    }
    )

def put_contact_dynamoDB(contact_id, agent_id, start, end,agent_name):
    """
    Register the call in the DynamoDB Recordings table.
        contact_id (str): Id of the call
        agent_id (str): Id of the agent
        start (Datetime): Initialization Timestamp
        end (Datetime): Call ended timestamp
        agent_name (str): Complete name of the agent
    """
    
    # Access DynamoDB
    dynamodb = boto3.resource('dynamodb', 'us-west-2')
    
    # Get Table to update
    table = dynamodb.Table('Recordings')
    
    duration = str(end.replace(microsecond = 0) - start.replace(microsecond = 0))
    
    table.put_item(
            Item={
                'RecordingId': contact_id,
                'agentId': agent_id,
                'agentName': agent_name,
                'duration': duration, 
                'initialTimestamp': start.astimezone(pytz.timezone('America/Mexico_City')).strftime("%Y-%m-%d %H:%M:%S"),
                'disconnectTimestamp': end.astimezone(pytz.timezone('America/Mexico_City')).strftime("%Y-%m-%d %H:%M:%S")
                
                })
    

def get_contact_information(contact_id):
    """
    Gets relevant information about a call and the agent that answered the call.
        contact_id (str): Id of the call
        
        RETURNS:
        Details of the contact(Dict)
        Details of the Agent (Dict)
    """
   
    contact_details = connect.describe_contact( InstanceId="23ace449-e885-41ac-8fd0-925423def8f6", ContactId=contact_id)
    agent_id = contact_details['Contact']['AgentInfo']["Id"]
    agent_details = connect.describe_user(UserId=agent_id,InstanceId="23ace449-e885-41ac-8fd0-925423def8f6")
    
    return contact_details['Contact'],agent_details['User']['IdentityInfo']



def copy_audio(origin_bucket, object_key, contact_id):
    """
    Function to copy the audio in a new s3 bucket where it will be matched and merged with its corresponding audio
        origin_bucket (str): Name of the origin bucket
        object_key (str): Key of the object to be copied
        contact_id (str): Id of the call the recording belongs to
    """
    s3.copy_object(Bucket = 'screen-raw-recordings', CopySource = f'{origin_bucket}/{object_key}', Key = f'audios/{contact_id}.wav')

def get_contact_attributes(contact_id):
    """
    Retrieves the id of the client and the results of the satisfaction survey if available.
        contact_id (str): Id of the call

        RETURNS:
        client_id (str): Id of the client
        problem_solved (Bool | None): Result of the "Was your problem solved?" Survey.
    """
    # Get call atributes
    attributes = connect.get_contact_attributes(InstanceId="23ace449-e885-41ac-8fd0-925423def8f6", InitialContactId= contact_id)['Attributes']
    
    # Get client id
    try:
        client_id = attributes['clientId']
    except:
        client_id = "00000000-0000-0000-0000-000000000000"
        
    # Get Solved Issue? attribute 
    try:
        retro_attribute = attributes['solvedIssue']
        if retro_attribute == "1":
            problem_solved = 1
        else:
            problem_solved = 0
    except:
        problem_solved = None
    
    return client_id,problem_solved

def put_contact_RDS(contact_id, agent_id, start, stop):
    """
    Register the call in the DynamoDB Calls table.
        contact_id (str): Id of the call
        agent_id (str): Id of the agent
        start (Datetime): Initialization Timestamp
        stop (Datetime): Call ended timestamp
    
    """
    
    #RDS settings
    rds_host = os.environ["RDS_HOST"]
    name = os.environ["DB_USERNAME"]
    password = os.environ["DB_PASSWORD"]
    db_name = os.environ["DB_NAME"]
    
    # Connection to the data base
    try:
        conn = pymysql.connect(host=rds_host, user=name, passwd=password, db=db_name,connect_timeout=5)
    except pymysql.MySQLError as e:
        sys.exit()
        
    duration = str(stop.replace(microsecond = 0) - start.replace(microsecond = 0))
    client_id,problem_solved = get_contact_attributes(contact_id)
    date = start.date()
  
    #Creation of cursor, SQL statement    
    cur = conn.cursor()
    sql = """insert into Calls (call_id, agent_id, client_id, time_start, time_finish, duration, problem_solved, date)
             values (%s, %s, %s, %s, %s, %s, %s, %s) 
        """
    cur.execute(sql,(contact_id, agent_id, client_id, start.astimezone(pytz.timezone('America/Mexico_City')), stop.astimezone(pytz.timezone('America/Mexico_City')), duration, problem_solved, date))
    conn.commit()


def lambda_handler(event, context):
    
    record = event['Records'][0]
        
    # Bucket
    s3bucket = record['s3']['bucket']['name']
    
    # Object Key
    s3object = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8')

    # Get the contact ID of the recording through its metadata (It will be the job-name)
    try:
        response = s3.get_object(Bucket=s3bucket, Key=s3object)
        contact_id = response['Metadata']['contact-id']
    except:
        contact_id = "JobwithoutMetadata"
    

    # Copy audio files to bucket 'screen-raw-recordings'
    copy_audio(s3bucket, s3object, contact_id)
    
    # Get Contact information
    contact_information,agent_information = get_contact_information(contact_id)
    
    # Information
    agent_id = contact_information['AgentInfo']["Id"]
    init_timestamp = contact_information['InitiationTimestamp']
    disc_timestamp = contact_information['DisconnectTimestamp']
    agent_name = f"{agent_information['FirstName']} {agent_information['LastName']}"
    
    # Register contact in dynamoDB
    put_contact_dynamoDB(contact_id,agent_id,init_timestamp,disc_timestamp,agent_name)
    
    # Register call in RDS
    put_contact_RDS(contact_id,agent_id, init_timestamp, disc_timestamp)
    
    # Start transcribe job
    start_transcribe_job(s3bucket,s3object,contact_id)
    
    # Generate subtitles
    create_subtitles_transcript(s3bucket,s3object,contact_id)


    
# Test case
if __name__ == "__main__":
 
    lambda_handler({
  "Records": [
    {
      "eventVersion": "2.0",
      "eventSource": "aws:s3",
      "awsRegion": "us-east-1",
      "eventTime": "1970-01-01T00:00:00.000Z",
      "eventName": "ObjectCreated:Put",
      "userIdentity": {
        "principalId": "EXAMPLE"
      },
      "requestParameters": {
        "sourceIPAddress": "127.0.0.1"
      },
      "responseElements": {
        "x-amz-request-id": "EXAMPLE123456789",
        "x-amz-id-2": "EXAMPLE123/5678abcdefghijklambdaisawesome/mnopqrstuvwxyzABCDEFGH"
      },
      "s3": {
        "s3SchemaVersion": "1.0",
        "configurationId": "testConfigRule",
        "bucket": {
          "name": "amazon-connect-b7d5ed773859",
          "ownerIdentity": {
            "principalId": "EXAMPLE"
          },
          "arn": "arn:aws:s3:::example-bucket"
        },
        "object": {
          "key": "Analysis/Voice/Redacted/2022/05/31/33806816-572e-4a10-b890-f094abdce658_call_recording_redacted_2022-05-31T22:33:51Z.wav",
          "size": 1024,
          "eTag": "0123456789abcdef0123456789abcdef",
          "sequencer": "0A1B2C3D4E5F678901"
        }
      }
    }
  ]
},2)
    
    
