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
import boto3


print('Loading function')
transcribe = boto3.client('transcribe', 'us-west-2')
s3 = boto3.client('s3')

def lambda_handler(event, context):
    
    record = event['Records'][0]
    
    # Bucket
    s3bucket = record['s3']['bucket']['name']
    # Object Key
    s3object = record['s3']['object']['key']

    # Get the contact ID of the recording through its metadata
    # (It will be the job-name)
    response = s3.get_object(Bucket=s3bucket, Key=s3object)
    job_name = response['Metadata']['contact-id']
    
    # Build URI of the recording that is going to be processed
    job_uri = f's3://{s3bucket}/{s3object}'
    # Transcribe job output location
    output_location = "s3://transcribe-job-results-group1/JobResults/"
    # Role to create the transcript operation
    data_access_role = "arn:aws:iam::559202700801:role/service-role/AmazonTranscribeServiceRole-TranscribeAccessRole"
    
    # Execute Transcribe Call Analytics Job
    transcribe.start_call_analytics_job(
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
