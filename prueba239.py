import urllib.parse

# Object Key
s3object = urllib.parse.unquote_plus("s3://amazon-connect-b7d5ed773859/connect/itesm2022AmazonConnect/CallRecordings/2022/05/06/7829bcf6-3657-4cef-b77f-8278e9045fb4_20220506T00%3A35_UTC.wav")
print(s3object)