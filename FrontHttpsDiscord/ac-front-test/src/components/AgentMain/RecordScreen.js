import React from "react";
import "../../styles/AgentMain/RecordScreen.css";
import { VscRecord } from "react-icons/vsc";
import { VscStopCircle } from "react-icons/vsc";
import { FiUpload } from "react-icons/fi";
import { useReactMediaRecorder } from "react-media-recorder";
import axios from "axios";
import { useTranslation } from "react-i18next";

// Función para grabar pantalla
const RecordScreen = (props) => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ screen: true });

  // Función para detener la grabación de pantalla. Se llama a la función
  // stopRecording de react media recorder y luego, después de 4 segundos, se presiona
  // el botón de subir al S3
  function stopRecordFunct() {
    stopRecording();
    console.log("Subiendo----");
    setTimeout(() => {
      document.getElementById("uploadButton").click();
    }, 4000);
  }

  // Función para subir video al S3.
  // Paso 1: Llamar a la función lambda. La lambda regresa un link para subir un archivo directo al S3
  // Paso 2: Hacer una peticion PUT usando el link que regresa la lambda. Se tiene que agregar el archivo a la petición
  const uploadVideo = async () => {
    // Link para la función lambda
    const API_ENDPOINT =
      "https://gmfy1qbiac.execute-api.us-west-2.amazonaws.com/default/getSignedURL";
    const mediaBlob = await fetch(mediaBlobUrl).then((response) =>
      response.blob()
    );

    // Petición GET a la lambda.
    // La variable response trae el link para subir a la S3
    const response = await axios({
      method: "GET",
      url: API_ENDPOINT,
    });

    // Creación del archvio mp4
    let file = new File([mediaBlob], response.data.fileName, {
      type: "video/mp4",
      lastModified: Date.now(),
    });

    console.log("Response: ", response.data);
    console.log("Uploading: ", file);
    console.log("Uploading to: ", response.data.uploadURL);

    // Petición PUT para subir el mp4 al S3. El archivo mp4 viene en body
    const result = await fetch(response.data.uploadURL, {
      method: "PUT",
      body: file,
    });
    console.log("Result: ", result);
  };

  // Language
  const { t } = useTranslation();

  return (
    <div className="rs-main-container">
      <h2 className="rs-title">{t("record")}</h2>
      <div className="rs-buttons-container">
        <button className="rs-button" onClick={startRecording}>
          <VscRecord />
        </button>
        <button className="rs-button" onClick={stopRecordFunct}>
          <VscStopCircle />
        </button>
        <button className="rs-button" id="uploadButton" onClick={uploadVideo}>
          <FiUpload />
        </button>
      </div>
    </div>
  );
};

export default RecordScreen;
