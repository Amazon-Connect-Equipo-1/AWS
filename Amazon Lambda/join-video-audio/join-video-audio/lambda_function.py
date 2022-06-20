'''
    Code to merge audio and video from S3 bucket 'screen-raw-recordings'
    Generates a new file and puts it into 'final-recordings' bucket
    
    Lambda Function 
    Authors:
    - Jacqueline Zavala.
    - Diego Juárez.
    - Luis Zamarripa.
    
    Creation date: 25/05/2022
    Last modification date: 01/06/2022
'''

# Lambda imports
import json
import uuid
import os
import boto3
import urllib.parse

# S3 Client
s3 = boto3.client('s3', 'us-west-2')

def lambda_handler(event, context):
  
    # Bucket
    s3_bucket_origin = os.environ["INPUT_BUCKET"]
    # key of the object input
    key_audio_s3_object = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8')
    
    # Get Audio Object to get its Metadata
    audio_object = s3.get_object(Bucket=s3_bucket_origin, Key=key_audio_s3_object)
    contact_id = audio_object['Metadata']['contact-id']
    
    # Object Key
    key_s3_object_video = f'videos/{contact_id}.mp4' # MP4 video
  
    # Path of the file
    destinationS3 = 's3://' + os.environ["OUTPUT_BUCKET"] + '/$fn$/'

    # Configuration Media Convert
    mediaConvertRole = os.environ["MEDIACONVERT_ROLE_ARN"]
    mediaConvertEndpoint = os.environ["MEDIACONVERT_ENDPOINT"]
    region = os.environ["REGION"]
    statusCode = 200
    body = {}

    # Use MediaConvert SDK UserMetadata to tag jobs with the assetID
    # Events from MediaConvert will have the assetID in UserMedata
    jobMetadata = {'assetID': key_s3_object_video}

    # add the account-specific endpoint to the client session
    client = boto3.client('mediaconvert', region_name=region, endpoint_url=mediaConvertEndpoint, verify=False)

    # Job settings are in the lambda zip file in the current working directory
    with open('job.json') as json_data:
        jobSettings = json.load(json_data)

    # Update the job settings with the source video from the S3 event and destination
    # paths for converted videos
    jobSettings['Inputs'][0]['FileInput'] = 's3://'+ s3_bucket_origin + '/' + key_s3_object_video
    jobSettings['Inputs'][0]['AudioSelectors']['Audio Selector 1']['ExternalAudioFileInput'] = 's3://'+ s3_bucket_origin + '/' + key_audio_s3_object
    
    # Convert the video using AWS Elemental MediaConvert
    job = client.create_job(Role=mediaConvertRole, UserMetadata=jobMetadata, Settings=jobSettings)
    body = {'success': True}
    create_video_dynamoDB(contact_id, key_s3_object_video)
    
# Update contact id register in DynamoDB
def create_video_dynamoDB(contact_id, key_s3_object_video):
    
    # DynamoDB connection
    dynamodb = boto3.resource('dynamodb', 'us-west-2')
    
    # Get Table to update
    table = dynamodb.Table('Recordings')
    
    # Create objects URLs
    processed_recording_url = f'https://final-recordings.s3.us-west-2.amazonaws.com/videos/{contact_id}.mp4'
    thumbnail_url = f'https://final-recordings.s3.us-west-2.amazonaws.com/thumbnails/{contact_id}.0000001.jpg'
    
    response = table.update_item(
        Key={
            'RecordingId': contact_id,
        },
        UpdateExpression="set processedRecording=:pr, thumbnail=:t",
        ExpressionAttributeValues={
            ':pr': processed_recording_url,
            ':t': thumbnail_url
        },
        ReturnValues="UPDATED_NEW"
    )
    return response