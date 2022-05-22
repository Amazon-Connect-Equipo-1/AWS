from __future__ import print_function
import json
import urllib.parse
import boto3
import time

print('Loading function')

s3 = boto3.client('s3')


def lambda_handler(event, context):
    #print("Received event: " + json.dumps(event, indent=2))

    # Get the object from the event and show its content type
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8')
    try:
        response = s3.get_object(Bucket=bucket, Key=key)
        #print(response)
        job_name = response['Metadata']['contact-id']
        print(job_name)
        print(f's3://{bucket}/{key}')
        start_transcribe_job(f's3://{bucket}/{key}',job_name)
        
        #print(response['Body'])
        #return response['ContentType']
        
    except Exception as e:
        print(e)
        print('Error getting object {} from bucket {}. Make sure they exist and your bucket is in the same region as this function.'.format(key, bucket))
        raise e
        
def start_transcribe_job(file_uri,job_name):
 
    transcribe = boto3.client('transcribe', 'us-west-2')
    job_name = job_name
    job_uri = file_uri
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
        
    while True:
        status = transcribe.get_call_analytics_job(CallAnalyticsJobName=job_name)
        if status['CallAnalyticsJob']['CallAnalyticsJobStatus'] in ['COMPLETED', 'FAILED']:
            break
        print("Not ready yet...")
        time.sleep(5)
    print(status)
    
    
lambda_handler({
  "Records": [
    {
      "eventVersion": "2.0",
      "eventSource": "aws:s3",
      "awsRegion": "us-west-2",
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
          "key": "connect/itesm2022AmazonConnect/CallRecordings/2022/05/01/7088724d-1003-4962-8359-feb8d774cf46_20220501T21:59_UTC.wav",
          "size": 1024,
          "eTag": "0123456789abcdef0123456789abcdef",
          "sequencer": "0A1B2C3D4E5F678901"
        }
      }
    }
  ]
},{})