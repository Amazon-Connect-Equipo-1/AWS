import "amazon-connect-streams";
import { useEffect, React, useState } from "react";
import "../../styles/AgentMain/RecordScreen.css";
import { useReactMediaRecorder } from "react-media-recorder";


/*

  Component that embeds the Amazon Connect Agent CPP in the application,
  starts recording when a call starts, and stops recording when the after call work ends.
  After stopping a recording, it uploads the recording to the corresponding s3 using
  the contact id as name.

  Authors:
    Erick Bustos
    Luis Zamarripa
    Liam Garay
    Jacqueline Zavala
    Diego Juárez
    Daniel García

*/


const EmbedConnect = (props) => {
  
  // Save the contact id (id of the call)
  var cid;

  // Initialize React Media recorder
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ screen: true, blobPropertyBag: {type: "video/mp4"} , onStop: uploadVideo ,askPermissionOnMount: false });
  

  // Function that will upload the recording to an S3
  // Step 1: Call lambda function. The lambda returns a link to upload a file direclty to the S3.
  // Step 2: Make a PUT petition using the link obtained through the lambda. We need to send the File Blob through the petition.

  async function uploadVideo(blobUrl,blob) {
    
    // Endpoint that we will use to retrieve a link that will let us upload the recording to our s3 bucket
    const API_ENDPOINT = "https://gmfy1qbiac.execute-api.us-west-2.amazonaws.com/default/getSignedURL"

    // POST petition to lambda
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

    // Create MP4 File Blob
    let file = await new File([blob], response.fileName, { type: 'video/mp4', lastModified: Date.now() });
    
    console.log('Response: ', response)
    console.log('Uploading: ', file)
    console.log('Uploading to: ', response.uploadURL)
    
    // Place PUT petition to upload the mp4 to the S3.
    const result = await fetch(response.uploadURL, {
      method: 'PUT',
      body: file
    })
    console.log('Result: ', result)

    return result;
  }
  
  // Code to embed the Amazon Connect CCP 
  useEffect(() => {
    const container = document.getElementById("ccp");
    // Initialize CCP
    // eslint-disable-next-line no-undef
    connect.core.initCCP(container, {
      ccpUrl: "https://itesm2022amazonconnect.my.connect.aws/connect/ccp-v2/", // REQUIRED
      loginPopup: true, // optional, defaults to `true`
      loginPopupAutoClose: true, // optional, defaults to `false`
      loginOptions: {
        // optional, if provided opens login in new window
        autoClose: true, // optional, defaults to `false`
        height: 600, // optional, defaults to 578
        width: 400, // optional, defaults to 433
        top: 0, // optional, defaults to 0
        left: 0, // optional, defaults to 0
      },
      region: "us-west-2", // REQUIRED for `CHAT`, optional otherwise
      softphone: {
        // optional, defaults below apply if not provided
        allowFramedSoftphone: true, // optional, defaults to false
        disableRingtone: false, // optional, defaults to false
        ringtoneUrl: "./ringtone.mp3", // optional, defaults to CCP’s default ringtone if a falsy value is set
      },
      pageOptions: {
        //optional
        enableAudioDeviceSettings: false, //optional, defaults to 'false'
        enablePhoneTypeSettings: true, //optional, defaults to 'true'
      },
      ccpAckTimeout: 5000, //optional, defaults to 3000 (ms)
      ccpSynTimeout: 3000, //optional, defaults to 1000 (ms)
      ccpLoadTimeout: 10000, //optional, defaults to 5000 (ms)
    });
    
    // Code to be executed once a call starts
    // eslint-disable-next-line no-undef
    connect.contact(function(contact){
      contact.onConnected(async function(contact){
        cid = contact.getContactId()
        window.alert(cid);
        startRecording();
        //await startRecording();
        var attributeMap = contact.getAttributes();
        window.alert('"You were not authenticated"')
        var auth = JSON.stringify(attributeMap["boolAuth"]["value"]);
        if(auth == '"You were not authenticated"'){
          window.alert("Not Authenticated PIN")
        }else{
          window.alert("Authenticated PIN")
        }
        console.log("Estado de la variable Auth: " + auth)
      });
    });

    // Agent subscriptions
    // eslint-disable-next-line no-undef
    connect.agent(function(agent) {
      // On state change stop recording
      agent.onStateChange(async function(agentStateChange) {
        if(agentStateChange.oldState === "AfterCallWork" && agentStateChange.newState === "Available"){
          await stopRecording();
          //await stopRecordFunct(cid);
        }else if(agentStateChange.oldState === "Offline" && agentStateChange.newState === "Available"){
          //await startRecording();
        }else if(agentStateChange.oldState === "Available" && agentStateChange.newState === "Offline"){
          //await stopRecording();
          
        }
      });
    });

  }, []);

  return (<div id="ccp" style={{ width: "400px", height: "500px" }}>
  </div>);
};

export default EmbedConnect;
