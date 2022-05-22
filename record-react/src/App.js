import { useReactMediaRecorder } from "react-media-recorder";
import axios from "axios";
 
const App = () => {
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ screen: true });

  const uploadVideo = async () => {
    const API_ENDPOINT = "https://gmfy1qbiac.execute-api.us-west-2.amazonaws.com/default/getSignedURL"
    const mediaBlob =  await fetch(mediaBlobUrl)
      .then(response => response.blob())

    const response = await axios({
      method: 'GET',
      url: API_ENDPOINT
    })

    let file = new File([mediaBlob], response.data.fileName, { type: 'video/mp4', lastModified: Date.now() });

    console.log('Response: ', response.data)
    console.log('Uploading: ', file)
    console.log('Uploading to: ', response.data.uploadURL)
    const result = await fetch(response.data.uploadURL, {
      method: 'PUT',
      body: file
    })
    console.log('Result: ', result)
  }
 
  return (
    <div>
      <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <button onClick={uploadVideo}>Upload S3</button>
      {/* <video src={mediaBlobUrl} controls autoPlay loop/> */}
    </div>
  );
};

export default App;