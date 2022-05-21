'''
    Función Lambda: dynamodb-update-s3-trigger (for tags)
    lamda_function.py

    Author:
    - Erick Bustos.

    Creation date: 5/05/2022
    Last modification date: 16/05/2022

    Program that acts as a trigger in the S3 that stores the transcribe job results.
    Thes job results from a video are processed and saved in the corresponding entry of that video in DynamoDB.
'''

import json
import boto3
import urllib.parse
from decimal import Decimal


def get_job_results(event):
    """
    Receives a S3 Object Put event.
    Retreives the json document from the s3 and transforms it into a python dictionary.
    Returns the dictionary.
    """
    # Connect to S3
    s3 = boto3.client('s3','us-west-2')
    record = event['Records'][0]
    # Bucket
    s3bucket = record['s3']['bucket']['name']
    # Object Key
    s3object = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8')

    # Get Object
    object = s3.get_object(Bucket=s3bucket,Key=s3object)
    id = object['Metadata']['jobname']

    # Read Body
    object_body = object['Body'].read().decode('utf-8')
    # Transform into dict
    json_content = json.loads(object_body)

    
    return json_content,id
  
def get_graph_customer_sentiment_overall(transcribe_job):
    
    customerData = {"NEUTRAL":0,"POSITIVE":0, "NEGATIVE":0}
    agentData = {"NEUTRAL":0,"POSITIVE":0, "NEGATIVE":0}
    
    
    for turn in transcribe_job["Transcript"]:
        if turn["ParticipantRole"] == "CUSTOMER":
            customerData[turn["Sentiment"]] += 1
        else:
            agentData[turn["Sentiment"]] += 1
    
    tot_customer = sum(customerData.values())
    tot_agent = sum(agentData.values())
    
    def calculate_percentage(v):
        return Decimal(str(v*100/tot_customer))

    result  = {p: calculate_percentage(v) for p, v in  customerData.items()}
    return result
    

def get_call_information(transcribe_job):
    #print(transcribe_job['ConversationCharacteristics'])
    conversation_characteristics = transcribe_job['ConversationCharacteristics']
    call_information = {}
    call_information["NonTalkTimeSeconds"] = Decimal(conversation_characteristics["NonTalkTime"]["TotalTimeMillis"]/1000)
    call_information["AgentInterruptions"] = len(conversation_characteristics["Interruptions"]["InterruptionsByInterrupter"].get("AGENT",[]))
    call_information["CustomerInterruptions"] = len(conversation_characteristics["Interruptions"]["InterruptionsByInterrupter"].get("CUSTOMER",[]))
    call_information["OverallAgentSentiment"] = Decimal(str(conversation_characteristics["Sentiment"]["OverallSentiment"].get("AGENT",0)))
    call_information["OverallCustomerSentiment"] = Decimal(str(conversation_characteristics["Sentiment"]["OverallSentiment"].get("CUSTOMER",0)))
    
    sentiment_by_quarter = []
    for entry in conversation_characteristics["Sentiment"]["SentimentByPeriod"]["QUARTER"]["CUSTOMER"]:
        sentiment_by_quarter.append(Decimal(str(entry["Score"])))
      
    call_information["GraphCustomerSentimentByQuarter"] = sentiment_by_quarter
    call_information["GraphCustomerSentimentOverall"] = get_graph_customer_sentiment_overall(transcribe_job)
    
    return call_information

def lambda_handler(event, context):
    
    # Access DynamoDB
    dynamodb = boto3.resource('dynamodb', 'us-west-2')
    
    # Get Table to update
    table = dynamodb.Table('Recordings-DEV')
    
    # Get Object
    transcribe_job,id = get_job_results(event)
    
    # Get Tags
    tags = transcribe_job["Categories"]["MatchedCategories"]
    call_information = get_call_information(transcribe_job)
    
    # Make update
    
    response = table.update_item(
        Key={
            'RecordingId': id,
        },
        UpdateExpression="set tags=:t, recordingData=:rd",
        ExpressionAttributeValues={
            ':t': tags,
            ':rd': call_information,
        },
        ReturnValues="UPDATED_NEW"
    )
    return response
   



if __name__ == '__main__':
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
          "name": "transcribe-job-results-group1",
          "ownerIdentity": {
            "principalId": "EXAMPLE"
          },
          "arn": "arn:aws:s3:::example-bucket"
        },
        "object": {
          "key": "JobResults/analytics/7088724d-1003-4962-8359-feb8d774cf46.json",
          "size": 1024,
          "eTag": "0123456789abcdef0123456789abcdef",
          "sequencer": "0A1B2C3D4E5F678901"
        }
      }
    }
  ]
},2)
