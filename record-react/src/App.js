import { useReactMediaRecorder } from "react-media-recorder";
import {S3} from "aws-sdk";
 
const App = () => {
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ screen: true });

  const processVideo = async (mediaBlobUrl) => {
    stopRecording();

    // Fetch del URL y conversion a blob
    const mediaBlob = await fetch(mediaBlobUrl)
      .then(response => response.blob());
  
    // File
    let file = new File([mediaBlob], 'filename', { type: 'video/webm',    lastModified: Date.now() })
    
    await uploadFilesToS3('webm','videos', file,'myfile')
    
    async function uploadFilesToS3(extension,path,file,fileName) {
      return new Promise(async (resolve, reject) => {
        const bucket = new S3(
          {
            accessKeyId: "",
            secretAccessKey: "",
            region: ""
          }
        );
        const params = {
          Bucket: "screen-raw-recordings",
          Key: path+ "/" + fileName+ extension,
          Body: file
        };
        bucket.upload(params,async(err,data)=>{
               if(data){
                    console.log("Video uploaded")
                 }
                 if(err){
                    console.log("Video uploaded failed")
                 }
           })
      })
    }
  }
 
  return (
    <div>
      <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={processVideo}>Stop Recording</button>
      <video src={mediaBlobUrl} controls autoPlay loop />
    </div>
  );
};

export default App;