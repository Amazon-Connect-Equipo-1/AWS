'''
    Lambda Function: check-pin-voiceid
    lambda_function.py

    Authors:
    - Jacqueline Zavala
    - Diego Juarez
    - Luis Zamarripa 

    Creation date: 30/04/2022
    Last modification date: 31/05/2022

'''

# Imports
import sys
import logging
import rds_config
import pymysql
import json
import hashlib

#RDS settings
rds_host = rds_config.rds_host
name = rds_config.db_username
password = rds_config.db_password
db_name = rds_config.db_name
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Connection to the data base
try:
    conn = pymysql.connect(host=rds_host, user=name, passwd=password, db=db_name,connect_timeout=5)
except pymysql.MySQLError as e:
    logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
    logger.error(e)
    sys.exit()
logger.info("SUCCESS: Connection to RDS MySQL instance succeeded")


def lambda_handler(event, context):
    # Retrieved data from Amazon Connect
    client_number = event["Details"]["ContactData"]["CustomerEndpoint"]["Address"]
    client_pin = event["Details"]["Parameters"]["clientPin"]

    # Hashing the pin
    hash_pin = hashlib.sha256(client_pin.encode())
    hex_dig = hash_pin.hexdigest()

    # SQL with cursos
    with conn.cursor() as cur:
        client_bool = "You were not authenticated"
        cur.execute("select client_id from Client where client_pin = '" + hex_dig + "' and phone_number = '" + client_number + "'")
        for row in cur:
            logger.info(row)
            client_bool = "You were authenticated"
        
    conn.commit()
    result = {
        "boolAuth": client_bool
    }
    return result
    

    
