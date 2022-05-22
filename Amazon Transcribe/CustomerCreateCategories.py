'''
CustomerCreateCategories.py
Author:
- Erick Bustos.

Creation date: 20/04/2022
Last modification date: 01/05/2022

Program that creates Amazon transcript call analytics categories to identify tags in
call center audio recordings (only for the customer).
'''

from __future__ import print_function
import time
import boto3
transcribe = boto3.client('transcribe', 'us-west-2')


# Overall positive
transcribe.create_call_analytics_category(
    CategoryName="c-entire-call-positive",
    Rules= [
          {
            "SentimentFilter": {
                "ParticipantRole": "CUSTOMER",
                "Sentiments": [
                    "POSITIVE"                    
                ]
              }
        }
                    
      ]
)

# Overall negative
transcribe.create_call_analytics_category(
    CategoryName="c-entire-call-negative",
    Rules= [
          {
            "SentimentFilter": {
                "ParticipantRole": "CUSTOMER",
                "Sentiments": [
                    "NEGATIVE"                    
                ]
              }
        }
                    
      ]
)