/*
  Flow to record an agent's screen
  Starts recording when a call starts, and stops recording when the After Call Work ends.
  After stopping a recording, it is uploaded to the corresponding S3 bucket using
  the Contact ID as name.
  
  Authors:
    Erick Bustos
    Luis Zamarripa
    Liam Garay
    Jacqueline Zavala
    Diego Juárez
*/

// Import the recording package
import { useReactMediaRecorder } from "react-media-recorder";

const App = () => {
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ screen: true, blobPropertyBag: {type: "video/mp4"} , onStop: uploadVideo ,askPermissionOnMount: false });

  /*
    Function that will upload the recording to its S3 bucket:
    Step 1: Call Lambda function. The function returns a link to upload a file direclty to the S3 bucket.
    Step 2: Make a PUT petition using the link obtained through the Lambda. We need to send the MP4 through the petition.
  */
  async function uploadVideo(blobUrl,blob) {

    // Save the Contact ID. This variable is filled on the Frontend using Amazon Connect Streams.
    var cid;
    
    // Endpoint that we'll use to retrieve a link that will let us upload the recording to the S3 bucket.
    const API_ENDPOINT = "https://gmfy1qbiac.execute-api.us-west-2.amazonaws.com/default/getSignedURL"

    // POST petition to the Lambda with the filename in the body.
    const response = await fetch(API_ENDPOINT,{
      method:'POST',
      mode: 'cors',
      body: JSON.stringify({contact_id:cid})
    }).then(response => response.json())
    .then(data =>{
      console.log(data); 
      return data; 
    })
    .catch(error =>{
      console.error('Error fetching uploading URL',error);
    })
    console.log(response.fileName);

    // Create MP4 File using the Blob
    let file = await new File([blob], response.fileName, { type: 'video/mp4', lastModified: Date.now() });
    
    console.log('Response: ', response)
    console.log('Uploading: ', file)
    console.log('Uploading to: ', response.uploadURL)
    
    // PUT petition to upload the MP4 to the S3 bucket using the response link.
    const result = await fetch(response.uploadURL, {
      method: 'PUT',
      body: file
    })
    console.log('Result: ', result)

    return result;
  }

 
  return (
    <div>
      <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <button onClick={uploadVideo}>Upload S3</button>
    </div>
  );
};

export default App;