'''
CallAnalyticsJob.py
Author:
- Erick Bustos.

Creation date: 20/04/2022
Last modification date: 01/05/2022

Program that creates Amazon creates a Call Analytics job seraching for the predefined categories.
'''

from __future__ import print_function
import time
import boto3
transcribe = boto3.client('transcribe', 'us-west-2')
job_name = "my-first-call-analytics-job2"
job_uri = "s3://amazon-connect-b7d5ed773859/connect/itesm2022AmazonConnect/CallRecordings/2022/05/01/12342424-5921-4865-8109-006886f41246_20220501T20:24_UTC.wav"
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