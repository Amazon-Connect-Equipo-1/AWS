
import boto3
transcribe = boto3.client('transcribe', 'us-west-2')


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
                            "is missing",
                            "can't find",
                            "cannot find",
                            "find"
                        ]
                    }
                }        
            ]
)


# Card declined
transcribe.create_call_analytics_category(
    CategoryName="card-declined",
    Rules= [
                {
                    "TranscriptFilter": {
                        "TranscriptFilterType": "EXACT",
                        "Targets": [
                            "my card was declined",
                            "my credit card was declined",
                            "declined",
                            "can't pay",
                            "cannot pay"
                        ]
                    }
                }        
            ]
)

# Card stolen
transcribe.create_call_analytics_category(
    CategoryName="stolen-card",
    Rules= [
                {
                    "TranscriptFilter": {
                        "TranscriptFilterType": "EXACT",
                        "ParticipantRole": "CUSTOMER",
                        "Targets": [
                            "my card was stolen",
                            "stolen",
                            "robbed"
                        ]
                    }
                }        
            ]
)

# Cancel card
transcribe.create_call_analytics_category(
    CategoryName="cancel-card",
    Rules= [
                {
                    "TranscriptFilter": {
                        "TranscriptFilterType": "EXACT",
                        "Targets": [
                            "cancel my card",
                            "cancel your card",
                            "cancelled your card",
                            "card was cancelled",
                            "cancelled the card",
                            "was cancelled"
                        ]
                    }
                }        
            ]
)

# Savings account
transcribe.create_call_analytics_category(
    CategoryName="savings-account",
    Rules= [
                {
                    "TranscriptFilter": {
                        "TranscriptFilterType": "EXACT",
                        "Targets": [
                            "savings",
                            "debit",
                            "debit card",
                            "savings account"
                        ]
                    }
                }        
            ]
)

# Insurance
transcribe.create_call_analytics_category(
    CategoryName="insurance",
    Rules= [
                {
                    "TranscriptFilter": {
                        "TranscriptFilterType": "EXACT",
                        "Targets": [
                            "insurance",
                            "coverage",
                            "damage",
                            "deductible",
                            "insurance policy"
                        ]
                    }
                }        
            ]
)

# Money withdrawal
transcribe.create_call_analytics_category(
    CategoryName="withdrawal",
    Rules= [
                {
                    "TranscriptFilter": {
                        "TranscriptFilterType": "EXACT",
                        "Targets": [
                            "withdraw",
                            "withdrawing",
                            "get money",
                            "get cash",
                            "withdrawal",
                        ]
                    }
                }        
            ]
)

# Loans
transcribe.create_call_analytics_category(
    CategoryName="loans",
    Rules= [
                {
                    "TranscriptFilter": {
                        "TranscriptFilterType": "EXACT",
                        "Targets": [
                            "loan",
                            "loans",
                            "borrow",
                            "interest rate"

                        ]
                    }
                }        
            ]
)

# Investments
transcribe.create_call_analytics_category(
    CategoryName="investments",
    Rules= [
                {
                    "TranscriptFilter": {
                        "TranscriptFilterType": "EXACT",
                        "Targets": [
                            "investment",
                            "investments",
                            "portfolio",
                            "stock",
                            "trade"

                        ]
                    }
                }        
            ]
)
