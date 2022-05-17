import { ReactMediaRecorder, useReactMediaRecorder } from 'react-media-recorder';
import AWS from 'aws-sdk'

function App() {
  
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    } = useReactMediaRecorder({
    screen: true,
    blobPropertyBag: {
        type: "video/mp4"
    }
  });

  const s3 = new AWS.S3({
    accessKeyId: "AKIAYEMYUBYA446WZ4WK",
    secretAccessKey: "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"
  });

  const upload = async () => {
    setUploaded(true);
    if (mediaBlobUrl) {
      const videoBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
      const formData = new FormData();

      formData.append("file", videoBlob, `demo.mp4`);

      const filename = 'demo'
      const fileContent = fs.readFileSync(fileName)

      const params = {
        Bucket: "screen-raw-recordings",
        Key: `${filename}.mp4`,
        Body: fileContent
      }

      s3.upload(params, (err, data) => {
        if (err) {
          reject(err)
        }
        resolve(data.Location)
      })
    }

  };


  const processvideo = async ()=>{
    stopRecording()
    upload()
    // const audioBlob = await fetch(mediaBlobUrl).then(r => r.blob());
    // // console.log(audioBlob);
    // const audiofile = new File([audioBlob], "demo.mp4", { type: "video/mp4" });
    // // const file = fs.createWriteStream("demo.mp4");
    // console.log(window.URL.createObjectURL(props.location.state.videoBlob));
  };

  return (
    <div>
      <p>{status}</p>
      <button onClick={startRecording}> Start Recording</button>
      <button onClick={processvideo} > Stop Recording</button>
      <video src={mediaBlobUrl} autoPlay loop controls></video>
    </div>
  );
}

export default App;
