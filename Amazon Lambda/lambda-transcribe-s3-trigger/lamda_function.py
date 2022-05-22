'''
    Función Lambda: lamda-transcribe-s3-trigger
    lamda_function.py

    Author:
    - Erick Bustos.

    Creation date: 20/04/2022
    Last modification date: 04/05/2022

    Program that acts as a trigger in the S3 that stores the audio recordings from a Amazon Connect.
    The video is processed with Amazon Transcribe Call Analytics, and the result is stored in a
    separate S3.
'''
from __future__ import print_function
from decimal import Decimal
from datetime import datetime, time
import boto3
import urllib.parse


print('Loading function')
transcribe = boto3.client('transcribe', 'us-west-2')
s3 = boto3.client('s3', 'us-west-2')

def start_transcribe_job(s3bucket,s3object,job_name):
    # Build URI of the recording that is going to be processed
    job_uri = f's3://{s3bucket}/{s3object}'
    print(f'job_uri: {job_uri}')
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
     
    print(result)


def put_contact_dynamoDB(contact_id, agentId, start, end):
    
    # Access DynamoDB
    dynamodb = boto3.resource('dynamodb', 'us-west-2')
    
    # Get Table to update
    table = dynamodb.Table('Recordings-DEV')
    
    duration = str(end.replace(microsecond = 0) - start.replace(microsecond = 0))
    
    table.put_item(
            Item={
                'RecordingId': contact_id,
                'agentId': agentId,
                'duration': duration, 
                'initialTimestamp': str(start.replace(microsecond = 0)),
                'disconnectTimestamp': str(end.replace(microsecond = 0))
                
                })
    

def get_contact_information(contact_id):
    
    connect = boto3.client('connect', 'us-west-2')
    contact_details = connect.describe_contact( InstanceId="23ace449-e885-41ac-8fd0-925423def8f6", ContactId=contact_id)
    return contact_details['Contact']

def lambda_handler(event, context):
    
    record = event['Records'][0]
    print(record)
    
    # Bucket
    s3bucket = record['s3']['bucket']['name']
    # Object Key
    s3object = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8')

    # Get the contact ID of the recording through its metadata
    # (It will be the job-name)
    try:
        response = s3.get_object(Bucket=s3bucket, Key=s3object)
        contact_id = response['Metadata']['contact-id']
    except:
        contact_id = "JobwithoutMetadata"
    
    # Get Contact information
    contact_information = get_contact_information(contact_id)
    
    # Register contact in dynamoDB
    put_contact_dynamoDB(contact_id,contact_information['AgentInfo']["Id"],contact_information['InitiationTimestamp'],contact_information['DisconnectTimestamp'])
    
    # Start transcribe job
    start_transcribe_job(s3bucket,s3object,contact_id)

if __name__ == "__main__":
    #print(get_contact_information("c8c25f9f-75d7-40d4-bef5-f12366bd4884"))
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
          "key": "Analysis/Voice/Redacted/2022/05/21/ec3a50df-974d-46d1-89f1-3be89798d777_call_recording_redacted_2022-05-21T18:46:10Z.wav",
          "size": 1024,
          "eTag": "0123456789abcdef0123456789abcdef",
          "sequencer": "0A1B2C3D4E5F678901"
        }
      }
    }
  ]
},2)
    
    
