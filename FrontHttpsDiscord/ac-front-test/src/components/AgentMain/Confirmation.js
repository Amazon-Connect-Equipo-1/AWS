/* O
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import "../../styles/AgentMain/ThirdParty.css";
import uberlogo from "../../images/uber.png";
import { createContext, Suspense, useState } from "react";

const Confirmation = (props) => {
  const token =
    "eyJraWQiOiJ1aVNXY0k0aG0rSTE3Y0lPWE1HN3NVMUxETFRtRzN4Rm1mY2lNUk5DaThNPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkYzI4MzBhYi0xZGJkLTQ5OTctOWI0Yy1iZmUyODZkZGQyYjYiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl9EaEttVmE3NFYiLCJjbGllbnRfaWQiOiI0dXVhNGVqdWR2N2JoMTZmbGIwc2YzZ2NyOCIsIm9yaWdpbl9qdGkiOiIzYjI3ZDdkNS1jZTZmLTQ4OTYtOTgyZC1jMTYzN2ZiM2ExMjYiLCJldmVudF9pZCI6ImU3NjM3YmViLTM5NTgtNDZlNi05ZWFlLTc5ZjZiOWIxNWNlYiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2NTM5MzgwMTAsImV4cCI6MTY1NDAyNDQxMCwiaWF0IjoxNjUzOTM4MDEwLCJqdGkiOiI0ODQ3YTkxNy1hMzZkLTQzMWYtOTZlNy0wNTc4Y2FmZWY2YmIiLCJ1c2VybmFtZSI6ImRjMjgzMGFiLTFkYmQtNDk5Ny05YjRjLWJmZTI4NmRkZDJiNiJ9.7ilihvw-XalwJ39c6WILiETkIB_UIxBJo6coX5SXNMr_zSExJvodAA8qiKUqN5ruPcT8HU69dxCN-t28n3AeyCsU3c6ZRZ0kny2mR8uCWhTTYIlr_FRk3PvaQAjK4bqYKokzS_v9GM2ibxI-nbIP2cwUXAkLCowldZKWL8O9kWuRYW6XtMrIvbgkgm4fp-cATp9vrHuTs5RV7BaU4aFQtqjEg_THoNcxbkM8J3GdMqkRVC09R8rnA6Vot91voqZic3GK9_IJESL6u6r1ZMuKjrns5O9KFXm48Cw-If2R6Bp3KSA-X6F6ucJ_At53GLlMgHwyhjdrhusuo-ZrqWSKvQ";

  const [conf, setConf] = useState("no");
  const changeConfig = () => {
    setConf("yes");
  };
  const pruebaBackTPS = (event) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      service: "Oxxo",
      service_data: {
        client: "Dwight Schrute",
        email: "A01379868@tec.mx",
        cellphone: "+525530323376",
        client_location: "Alfredo's Pizza Cafe",
        oxxo_address: {
          street: "JOSE MA LICEAGA 406 S/N, MORELOS SECC LOMA, 20270",
          state: "Aguascalientes",
          colony: "Aguascalientes",
          zip_code: 20270,
          country: "Mexico",
        },
        quantity: 501,
        account_number: 6969696969,
        reference: "891753",
        security_token: "4605",
        timestamp: "2022-05-30 15:16:53.006495",
      },
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://35.88.250.238:8080/tps/sendService", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="tp-confirmation">
      <div className="tp-title">
        Service Confirmation
        {conf === "yes" && (
          <div>
            <div className="tp-confirmation-text">Informacion Enviada!</div>
            <div className="tp-confirmation-button-container">
              <button
                className="tp-confirmation-button"
                onClick={pruebaBackTPS}
              >
                confirmado
              </button>
            </div>
          </div>
        )}
        {conf === "no" && (
          <div>
            <div className="tp-confirmation-text">sexo</div>
            <div className="tp-confirmation-button-container">
              <button className="tp-confirmation-button">Regresar</button>
              <button className="tp-confirmation-button" onClick={changeConfig}>
                Mandar info
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Confirmation;
