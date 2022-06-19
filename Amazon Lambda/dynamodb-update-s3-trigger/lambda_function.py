'''
    Función Lambda: dynamodb-update-s3-trigger (for tags)
    lamda_function.py

    Author:
    - Erick Bustos.

    Creation date: 5/05/2022
    Last modification date: 30/05/2022

    Program that acts as a trigger in the S3 that stores the transcribe job results.
    Thes job results from a video are processed and saved in the corresponding entry of that video in DynamoDB.
    Tags are extracted and/or created.
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

def get_sentiment_tag(first_half,second_half):
    """
    Determines the best sentiment transition tag for the call.
    
    Receives:
        first_half (dict): Customer sentiment information during the first half
        second_half (dict): Customer sentiment information during the second half
    Returns:
        List with the selected tag. It can be empty.

    """
    max_first_half = max(first_half,key=first_half.get)
    max_second_half = max(second_half,key=second_half.get)
    
  
    if first_half[max_first_half] == 0 or second_half[max_second_half] == 0:
        if second_half[max_second_half] != 0 and max_second_half == "POSITIVE":
            return ["ended-positive"]
        elif second_half[max_second_half] != 0 and max_second_half == "NEGATIVE":
            return ["ended-negative"]
        else:
            return []    
    elif max_first_half == "POSITIVE" and max_second_half == "POSITIVE":
        return ["c-entire-call-positive"]
    elif max_first_half == "NEGATIVE" and max_second_half == "NEGATIVE":
        return ["c-entire-call-negative"]
    elif max_first_half == "NEGATIVE" and max_second_half == "POSITIVE":
        return ["c-negative-to-positive"]
    elif max_first_half == "POSITIVE" and max_second_half == "NEGATIVE":
        return ["c-positive-to-negative"]
    else:
        return []
  
def analyze_transcript(transcript):
    """
    Generatea percentages of sentiment for the overall call, e.g. 
    POSITIVE = 50%, NEGATIVE = 20%, MIXED = 2%, NEUTRAL = 28%
    and select a sentiment Tag from:
        c-entire-call-negative
        c-entire-call-positive
        c-negative-to-positive
        c-positive-to-negative
        ended-positive
        ended-negative
        
    Receives:
        transcript(dict): transcript of the call
        
    Returns:
        (percentages,tag): tuple
    """
    # Data for the entire call
    customerData = {"POSITIVE":0, "NEGATIVE":0,"NEUTRAL":0, "MIXED":0}
    agentData = {"POSITIVE":0, "NEGATIVE":0,"NEUTRAL":0,"MIXED":0}
    
    # Customer data every half call
    customer_first_half_data = {"POSITIVE":0, "NEGATIVE":0}
    customer_second_half_data = {"POSITIVE":0, "NEGATIVE":0}
    
    num_interactions = len(transcript)
    middle = num_interactions//2
    
    # Extract data
    for turn in range(0,num_interactions):
        if transcript[turn]["ParticipantRole"] == "CUSTOMER":
            customerData[transcript[turn]["Sentiment"]] += 1
            if turn <= middle and transcript[turn]["Sentiment"] not in ["NEUTRAL","MIXED"]:
                customer_first_half_data[transcript[turn]["Sentiment"]] += 1
            elif transcript[turn]["Sentiment"] not in ["NEUTRAL","MIXED"]:
                customer_second_half_data[transcript[turn]["Sentiment"]] += 1
        else:
            agentData[transcript[turn]["Sentiment"]] += 1
    
    tot_customer = sum(customerData.values())
    tot_agent = sum(agentData.values())
    
    def calculate_percentage(v):
        return Decimal(str(round(v*100/tot_customer,1)))

    # Get tag
    tag = get_sentiment_tag(customer_first_half_data,customer_second_half_data)

    # Calculate sentiment percentages
    percentages  = {p: calculate_percentage(v) for p, v in  customerData.items()}
    
    return percentages,tag
    

def get_call_information(transcribe_job):
    """
    Extracts relevant information about the call from the transcribe job results and stores it in a dictionary.
        Receives:
            transcribe_job (dict): Results from a Transcribe Call Analytics Job
        Returns (dict):
            {
                "AgentInterruptions": (int) The number of times the agent interrupted the customer,
                "CustomerInetrruptions": (int) The number of times the customer interrupted the agent,
                "NonTalkTimeSeconds": (int) Seconds of silence in the call,
                "OverallAgentSentiment": (Decimal) Value between [-5,+5] where -5 is extreme negative sentiment, and +5 extreme positive sentiment,
                "OverallCustomerSentiment": (Decimal) Value between [-5,+5] where -5 is extreme negative sentiment, and +5 extreme positive sentiment,
                "GraphCustomerSentimentByQuarter": (arr[Decimal]) Array of four values between [-5,+5] where -5 is extreme negative sentiment, and +5 extreme positive sentiment, each corresponding every quarter of the call,
                "GraphCustomerSentimentOverall":{
                    “POSITIVE”: (Decimal),
                    “NEGATIVE”: (Decimal),
                    “MIXED”: (Decimal),
                    “NEUTRAL”:(Decimal),
                }

            }
    """
   
    conversation_characteristics = transcribe_job['ConversationCharacteristics']
    call_information = {}
    call_information["NonTalkTimeSeconds"] = Decimal(str(conversation_characteristics["NonTalkTime"]["TotalTimeMillis"]/1000))
    call_information["AgentInterruptions"] = len(conversation_characteristics["Interruptions"]["InterruptionsByInterrupter"].get("AGENT",[]))
    call_information["CustomerInterruptions"] = len(conversation_characteristics["Interruptions"]["InterruptionsByInterrupter"].get("CUSTOMER",[]))
    call_information["OverallAgentSentiment"] = Decimal(str(conversation_characteristics["Sentiment"]["OverallSentiment"].get("AGENT",0)))
    call_information["OverallCustomerSentiment"] = Decimal(str(conversation_characteristics["Sentiment"]["OverallSentiment"].get("CUSTOMER",0)))
    
    sentiment_by_quarter = []
    for entry in conversation_characteristics["Sentiment"]["SentimentByPeriod"]["QUARTER"]["CUSTOMER"]:
        sentiment_by_quarter.append(Decimal(str(entry["Score"])))
      
    call_information["GraphCustomerSentimentByQuarter"] = sentiment_by_quarter
    
    return call_information

def get_retro_tag(contact_id):
    """
        Uses the Amazon Connect API to get the results of the satisfaction survey.
        If the result is 1, returns the tag "problem-solved",
        otherwise return the tag "problem-not-solved"
            contact_id (str): Id of the call
        
    """
    connect = boto3.client('connect', 'us-west-2')
    retro_attribute = connect.get_contact_attributes(InstanceId="23ace449-e885-41ac-8fd0-925423def8f6", InitialContactId= contact_id)['Attributes']['solvedIssue']
    if retro_attribute == "1":
        retro_tag = "problem-solved"
    else:
        retro_tag = "problem-not-solved"
    
    return retro_tag
        

def lambda_handler(event, context):
    
    # Access DynamoDB
    dynamodb = boto3.resource('dynamodb', 'us-west-2')
    
    # Get Table to update
    table = dynamodb.Table('Recordings')
    
    # Get Object
    transcribe_job,id = get_job_results(event)
    
    # Get Tags
    tags = transcribe_job["Categories"]["MatchedCategories"]
    call_information = get_call_information(transcribe_job)
    
    # Get User Retro Tag (Was the problem of the call solved?)
    try:
        user_retro_tag = get_retro_tag(id)
        tags.append(user_retro_tag)
    except:
        pass
    
    # Analyze the sentiment information in the transcript and its results to the call information and the tag list
    overall_customer_sentiment_data, sentiment_tag = analyze_transcript(transcribe_job["Transcript"])
    call_information["GraphCustomerSentimentOverall"] = overall_customer_sentiment_data
    tags.extend(sentiment_tag)
    
    
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
   
# Test
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
          "key": "JobResults/analytics/6a135656-8d3b-46ca-83bf-12abb6b3e8a6.json",
          "size": 1024,
          "eTag": "0123456789abcdef0123456789abcdef",
          "sequencer": "0A1B2C3D4E5F678901"
        }
      }
    }
  ]
},2)
