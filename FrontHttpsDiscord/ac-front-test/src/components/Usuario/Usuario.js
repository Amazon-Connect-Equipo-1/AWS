/* Usuario
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import "../../styles/Usuario/Usuario.css";
import logo from "../../images/logo_bbva.png";
import Llamada from "./llamada";
import { useState } from "react";

//Verify if the user is on a Call or no
const Usuario = (props) => {
  const [incall, setInCall] = useState(false);
  const [statecall, setStateCall] = useState("Call");
  const [option, setOption] = useState("usuario-en-llamada");

  const enllamada = () => {
    setInCall(!incall);
    if (incall === true) {
      setStateCall("Call");
      setOption("usuario-en-llamada");
    }
    if (incall === false) {
      setStateCall("Cancel");
      setOption("usuario-no-llamada");
    }
  };

  return (
    <div className="usuario-contenedor">
      <img className="usuario-imagen" src={logo} alt="Logo BBVA" />

      <div className="usuario-chatbot-contenedor">
        <div className="usuario-chatbot">
          <div>
            <Llamada data={incall} />
            <button className={option} onClick={enllamada}>
              <p className="usuario-texto">{statecall}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Usuario;
