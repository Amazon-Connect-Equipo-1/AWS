'''
    Función Lambda: check-voice-id
    rds_config.py

    Authors:
    - Jacqueline Zavala
    - Diego Juarez

    Creation date: 15/04/2022
    Last modification date: 30/05/2022

    This script gets the environment variables associated to this Lambda for the RDS connection.
'''

import os
rds_host = os.environ["RDS_HOST"]
db_name = os.environ["DB_NAME"]
db_username = os.environ["DB_USERNAME"]
db_password = os.environ["DB_PASSWORD"]
