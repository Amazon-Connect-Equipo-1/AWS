/*
  Code to generate an URL to upload a file into 'screen-raw-recordings' bucket
  This link also names the file as the call's Amazon Connect Contact ID
    
  Lambda Function 
  Authors:
  - Luis Zamarripa
  - Jacqueline Zavala
  - Diego Juarez
    
  Creation date: 20/05/2022
  Last modification date: 11/06/2022
*/

// Imports and region configuration
const AWS = require('aws-sdk');
AWS.config.update({region:"us-west-2"});
const s3 = new AWS.S3();

const URL_EXPIRATION_SECONDS = 300;

// Main Lambda entry point
exports.handler = async (event,context) => {
  
  // Parse of the JSON through the POST request
  let newJson = JSON.parse(event.body)
  
  // Get the Contact ID
  const contact_id = newJson.contact_id
  
  // Call the main function to create the URL
  const result = await getUploadURL(contact_id);
  return result;
};

const getUploadURL = async function(contact_id) {
  
  // Configuration of the parameters for the generated URL
  const s3Params = {
    Bucket: process.env.UploadBucket,
    Key:  `videos/${contact_id}.mp4`,
    ContentType: 'video/mp4',
    Expires: URL_EXPIRATION_SECONDS,
    ACL: 'public-read'      // Enable this setting to make the object publicly readable - only works if the bucket can support public objects
  };
  
  return new Promise((resolve, reject) => {
    // Lambda response
    resolve({
      "statusCode": 200,
      "isBase64Encoded": false,
      "headers": {
        "Access-Control-Allow-Origin": "*"
      },
      "body": JSON.stringify({
          "uploadURL": s3.getSignedUrl('putObject', s3Params),  // Function to get the URL with the parameters already set up
          "fileName": `${contact_id}.mp4`  // Name assigned to the file to be uploaded. We name it as the Contact ID
      })
    });
  });
};
