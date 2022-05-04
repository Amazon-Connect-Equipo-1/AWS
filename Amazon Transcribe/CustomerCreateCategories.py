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

# Create negative to positive category
transcribe.create_call_analytics_category(
    CategoryName="c-negative-to-positive",
    Rules= [
          {
            "SentimentFilter": {
                "ParticipantRole": "CUSTOMER",
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
                "ParticipantRole": "CUSTOMER",
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
                "ParticipantRole": "CUSTOMER",
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
                "ParticipantRole": "CUSTOMER",
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

result = transcribe.get_call_analytics_category(CategoryName="c-negative-to-positive")    
print(result)

# Create positive to negative category
transcribe.create_call_analytics_category(
    CategoryName="c-positive-to-negative",
    Rules= [
          {
            "SentimentFilter": {
                "ParticipantRole": "CUSTOMER",
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
                "ParticipantRole": "CUSTOMER",
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
                "ParticipantRole": "CUSTOMER",
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
                "ParticipantRole": "CUSTOMER",
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

result = transcribe.get_call_analytics_category(CategoryName="c-positive-to-negative")    
print(result)


# Create positive to positive category
transcribe.create_call_analytics_category(
    CategoryName="c-positive-to-positive",
    Rules= [
          {
            "SentimentFilter": {
                "ParticipantRole": "CUSTOMER",
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
                "ParticipantRole": "CUSTOMER",
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
                "ParticipantRole": "CUSTOMER",
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
                "ParticipantRole": "CUSTOMER",
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

result = transcribe.get_call_analytics_category(CategoryName="c-positive-to-positive")    
print(result)

# Create negative to negative category
transcribe.create_call_analytics_category(
    CategoryName="c-negative-to-negative",
    Rules= [
          {
            "SentimentFilter": {
                "ParticipantRole": "CUSTOMER",
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
                "ParticipantRole": "CUSTOMER",
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
                "ParticipantRole": "CUSTOMER",
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
                "ParticipantRole": "CUSTOMER",
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

result = transcribe.get_call_analytics_category(CategoryName="c-negative-to-negative")    
print(result)

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

result = transcribe.get_call_analytics_category(CategoryName="c-entire-call-positive")    
print(result)

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

result = transcribe.get_call_analytics_category(CategoryName="c-entire-call-negative")    
print(result)

# Overall neutral
transcribe.create_call_analytics_category(
    CategoryName="c-entire-call-neutral",
    Rules= [
          {
            "SentimentFilter": {
                "ParticipantRole": "CUSTOMER",
                "Sentiments": [
                    "NEUTRAL"                    
                ]
              }
        }
                    
      ]
)

result = transcribe.get_call_analytics_category(CategoryName="c-entire-call-neutral")    
print(result)

# Overall mixed
transcribe.create_call_analytics_category(
    CategoryName="c-entire-call-mixed",
    Rules= [
          {
            "SentimentFilter": {
                "ParticipantRole": "CUSTOMER",
                "Sentiments": [
                    "MIXED"                    
                ]
              }
        }
                    
      ]
)

result = transcribe.get_call_analytics_category(CategoryName="c-entire-call-neutral")    
print(result)

# Lost credit card
transcribe.create_call_analytics_category(
    CategoryName="lost-card",
    Rules= [
                {
                    "TranscriptFilter": {
                        "TranscriptFilterType": "EXACT",
                        "ParticipantRole": "CUSTOMER",
                        "Targets": [
                            "lost my card",
                            "lost my credit card",
                            "lost",
                            "my card was stolen",
                            "is missing"
                        ]
                    }
                }        
            ]
)

result = transcribe.get_call_analytics_category(CategoryName="lost-card")    
print(result)

# Card declined
transcribe.create_call_analytics_category(
    CategoryName="card-declined",
    Rules= [
                {
                    "TranscriptFilter": {
                        "TranscriptFilterType": "EXACT",
                        "ParticipantRole": "CUSTOMER",
                        "Targets": [
                            "my card was declined",
                            "my credit card was declined",
                            "declined"
                        ]
                    }
                }        
            ]
)

result = transcribe.get_call_analytics_category(CategoryName="card-declined")    
print(result)