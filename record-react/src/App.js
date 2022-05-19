import { useReactMediaRecorder } from "react-media-recorder";
import {S3} from "aws-sdk";
import { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } from "./envExports";
import { saveAs } from "file-saver";
 
const App = () => {
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ screen: true });

  function uploadFilesToS3(extension,path,file,fileName) {
    return new Promise(async (resolve, reject) => {
      const bucket = new S3(
        {
          accessKeyId: "",
          secretAccessKey: "",
          region: "us-west-2"
        }
      );
      const params = {
        Bucket: "screen-raw-recordings",
        Key: path+ "/" + fileName+"."+ extension,
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

  const uploadVideo = async () => {
    // Fetch del URL y conversion a blob
    const mediaBlob =  await fetch(mediaBlobUrl)
      .then(response => response.blob())

    let file = new File([mediaBlob], 'filename', { type: 'video/wav', lastModified: Date.now() });

    await uploadFilesToS3('wav','videos', file ,'prueba11');
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