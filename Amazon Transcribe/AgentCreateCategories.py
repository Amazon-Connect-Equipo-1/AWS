'''
AgentCreateCategories.py
Author:
- Erick Bustos.

Creation date: 20/04/2022
Last modification date: 02/05/2022

Program that creates Amazon transcript call analytics categories to identify tags in
call center audio recordings (only for the AGENT).
'''

from __future__ import print_function
import time
import boto3
transcribe = boto3.client('transcribe', 'us-west-2')

# Create negative to positive category
transcribe.create_call_analytics_category(
    CategoryName="a-negative-to-positive",
    Rules= [
          {
            "SentimentFilter": {
                "ParticipantRole": "AGENT",
                "Sentiments": [
                    "NEGATIVE"                    
                ],
                "RelativeTimeRange": {
                    "StartPercentage": 0,
                    "EndPercentage": 50
                }
              }
        },
        {
            "SentimentFilter": {
                "ParticipantRole": "AGENT",
                "Sentiments": [
                    "POSITIVE"                    
                ],
                "RelativeTimeRange": {
                    "StartPercentage": 0,
                    "EndPercentage": 50
                  
                },
                "Negate": True
            }
        },
        {
            "SentimentFilter": {
                "ParticipantRole": "AGENT",
                "Sentiments": [
                    "POSITIVE"                    
                ],
                "RelativeTimeRange": {
                    "StartPercentage": 50,
                    "EndPercentage": 100
                  
                }
            }
        },
        {
            "SentimentFilter": {
                "ParticipantRole": "AGENT",
                "Sentiments": [
                    "NEGATIVE"                    
                ],
                "RelativeTimeRange": {
                        "StartPercentage": 50,
                        "EndPercentage": 100
                    
                },
                "Negate": True
            }
        }
                    
      ]
)

result = transcribe.get_call_analytics_category(CategoryName="a-negative-to-positive")    
print(result)

# Create positive to negative category
transcribe.create_call_analytics_category(
    CategoryName="a-positive-to-negative",
    Rules= [
          {
            "SentimentFilter": {
                "ParticipantRole": "AGENT",
                "Sentiments": [
                    "POSITIVE"                    
                ],
                "RelativeTimeRange": {
                    "StartPercentage": 0,
                    "EndPercentage": 50
                }
              }
        },
        {
            "SentimentFilter": {
                "ParticipantRole": "AGENT",
                "Sentiments": [
                    "NEGATIVE"                    
                ],
                "RelativeTimeRange": {
                    "StartPercentage": 0,
                    "EndPercentage": 50
                  
                },
                "Negate": True
            }
        },
        {
            "SentimentFilter": {
                "ParticipantRole": "AGENT",
                "Sentiments": [
                    "NEGATIVE"                    
                ],
                "RelativeTimeRange": {
                    "StartPercentage": 50,
                    "EndPercentage": 100
                  
                }
            }
        },
        {
            "SentimentFilter": {
                "ParticipantRole": "AGENT",
                "Sentiments": [
                    "POSITIVE"                    
                ],
                "RelativeTimeRange": {
                        "StartPercentage": 50,
                        "EndPercentage": 100
                    
                },
                "Negate": True
            }
        }
                    
      ]
)

result = transcribe.get_call_analytics_category(CategoryName="a-positive-to-negative")    
print(result)


# Create positive to positive category
transcribe.create_call_analytics_category(
    CategoryName="a-positive-to-positive",
    Rules= [
          {
            "SentimentFilter": {
                "ParticipantRole": "AGENT",
                "Sentiments": [
                    "POSITIVE"                    
                ],
                "RelativeTimeRange": {
                    "StartPercentage": 0,
                    "EndPercentage": 50
                }
              }
        },
        {
            "SentimentFilter": {
                "ParticipantRole": "AGENT",
                "Sentiments": [
                    "NEGATIVE"                    
                ],
                "RelativeTimeRange": {
                    "StartPercentage": 0,
                    "EndPercentage": 50
                  
                },
                "Negate": True
            }
        },
        {
            "SentimentFilter": {
                "ParticipantRole": "AGENT",
                "Sentiments": [
                    "POSITIVE"                    
                ],
                "RelativeTimeRange": {
                    "StartPercentage": 50,
                    "EndPercentage": 100
                  
                }
            }
        },
        {
            "SentimentFilter": {
                "ParticipantRole": "AGENT",
                "Sentiments": [
                    "NEGATIVE"                    
                ],
                "RelativeTimeRange": {
                        "StartPercentage": 50,
                        "EndPercentage": 100
                    
                },
                "Negate": True
            }
        }
                    
      ]
)

result = transcribe.get_call_analytics_category(CategoryName="a-positive-to-positive")    
print(result)

# Create negative to negative category
transcribe.create_call_analytics_category(
    CategoryName="a-negative-to-negative",
    Rules= [
          {
            "SentimentFilter": {
                "ParticipantRole": "AGENT",
                "Sentiments": [
                    "NEGATIVE"                    
                ],
                "RelativeTimeRange": {
                    "StartPercentage": 0,
                    "EndPercentage": 50
                }
              }
        },
        {
            "SentimentFilter": {
                "ParticipantRole": "AGENT",
                "Sentiments": [
                    "POSITIVE"                    
                ],
                "RelativeTimeRange": {
                    "StartPercentage": 0,
                    "EndPercentage": 50
                  
                },
                "Negate": True
            }
        },
        {
            "SentimentFilter": {
                "ParticipantRole": "AGENT",
                "Sentiments": [
                    "NEGATIVE"                    
                ],
                "RelativeTimeRange": {
                    "StartPercentage": 50,
                    "EndPercentage": 100
                  
                }
            }
        },
        {
            "SentimentFilter": {
                "ParticipantRole": "AGENT",
                "Sentiments": [
                    "POSITIVE"                    
                ],
                "RelativeTimeRange": {
                        "StartPercentage": 50,
                        "EndPercentage": 100
                    
                },
                "Negate": True
            }
        }
                    
      ]
)

result = transcribe.get_call_analytics_category(CategoryName="a-negative-to-negative")    
print(result)

# Overall positive
transcribe.create_call_analytics_category(
    CategoryName="a-entire-call-positive",
    Rules= [
          {
            "SentimentFilter": {
                "ParticipantRole": "AGENT",
                "Sentiments": [
                    "POSITIVE"                    
                ]
              }
        }
                    
      ]
)

result = transcribe.get_call_analytics_category(CategoryName="a-entire-call-positive")    
print(result)

# Overall negative
transcribe.create_call_analytics_category(
    CategoryName="a-entire-call-negative",
    Rules= [
          {
            "SentimentFilter": {
                "ParticipantRole": "AGENT",
                "Sentiments": [
                    "NEGATIVE"                    
                ]
              }
        }
                    
      ]
)

result = transcribe.get_call_analytics_category(CategoryName="a-entire-call-negative")    
print(result)

# Overall neutral
transcribe.create_call_analytics_category(
    CategoryName="a-entire-call-neutral",
    Rules= [
          {
            "SentimentFilter": {
                "ParticipantRole": "AGENT",
                "Sentiments": [
                    "NEUTRAL"                    
                ]
              }
        }
                    
      ]
)

result = transcribe.get_call_analytics_category(CategoryName="a-entire-call-neutral")    
print(result)

# Overall mixed
transcribe.create_call_analytics_category(
    CategoryName="a-entire-call-mixed",
    Rules= [
          {
            "SentimentFilter": {
                "ParticipantRole": "AGENT",
                "Sentiments": [
                    "MIXED"                    
                ]
              }
        }
                    
      ]
)

result = transcribe.get_call_analytics_category(CategoryName="a-entire-call-neutral")    
print(result)
