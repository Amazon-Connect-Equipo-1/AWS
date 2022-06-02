/* PopLLamada
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import "../../styles/Usuario/PopLlamada.css";
//import logo from "../../images/logo_bbva.png";
//import Chatbots from "../Usuario/Chatbots";
import llamada from "../../images/Call.jpg";
import { useState } from "react";

//Creates PopLLamada
const PopLlamada = (props) => {
  const [calling, setCalling] = useState(false);
  const state = props.data;

  const call = () => {
    setCalling(!calling);
  };

  if (calling) {
    return (
      <div>
        <img className="PopLlamada-img" src={llamada} alt="" />
      </div>
    );
  }

  return (
    <div className="PopLlamada-contenedor">
      <div className="PopLlamada-texto">
        <a href="+1 3824563299">+1 3824563299</a>
      </div>

      <div>
        <button className="PopLlamada-boton-left">Cancel</button>
        <button className="PopLlamada-boton-right" onClick={call}>
          Call
        </button>
      </div>
    </div>
  );
};
export default PopLlamada;
