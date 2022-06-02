'''
    Lambda Function: check-voice-id
    lambda_function.py

    Authors:
    - Jacqueline Zavala
    - Diego Juarez

    Creation date: 15/04/2022
    Last modification date: 30/05/2022

    This function connects to the relational database and gets the id of the client that matches the telephone number passed
'''

# Imports 
import sys
import logging
import rds_config
import pymysql
import json

#RDS settings of the database
rds_host = rds_config.rds_host
name = rds_config.db_username
password = rds_config.db_password
db_name = rds_config.db_name
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Connection to the database
try:
    conn = pymysql.connect(host=rds_host, user=name, passwd=password, db=db_name,connect_timeout=5)
except pymysql.MySQLError as e:
    logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
    logger.error(e)
    sys.exit()
logger.info("SUCCESS: Connection to RDS MySQL instance succeeded")


def lambda_handler(event, context):
    #Default value of the client id
    id_client = '0'
    
    # Get the value from event agrument
    client_number = event["Details"]["ContactData"]["CustomerEndpoint"]["Address"]
    
    # Query the client_id and traverse the cursor
    with conn.cursor() as cur:
        cur.execute("select client_id from Client where phone_number = '" + client_number + "'")
        for row in cur:
            logger.info(row)
            id_client = row[0]
            logger.info(id_client)
    conn.commit()
    # Result 
    result = {
        "clientId": id_client
    }
    return result
