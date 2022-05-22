from __future__ import print_function
import json
import urllib.parse
import boto3
import time

print('Loading function')
transcribe = boto3.client('transcribe', 'us-west-2')
s3 = boto3.client('s3')

def lambda_handler(event, context):
    
    record = event['Records'][0]
    
    s3bucket = record['s3']['bucket']['name']
    s3object = record['s3']['object']['key']

    # Get the object from the event and show its content type
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8')
    
    response = s3.get_object(Bucket=s3bucket, Key=s3object)
    job_name = response['Metadata']['contact-id']
    job_uri = f's3://{s3bucket}/{s3object}'
    output_location = "s3://transcribe-job-results-group1/JobResults/"
    data_access_role = "arn:aws:iam::559202700801:role/service-role/AmazonTranscribeServiceRole-TranscribeAccessRole"
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
        
   
        
        
def start_transcribe_job(file_uri,job_name):
    pass

