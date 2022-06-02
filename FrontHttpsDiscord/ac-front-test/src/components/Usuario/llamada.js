/* Llamada
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import "../../styles/Usuario/Usuario.css";
//import logo from "../../images/logo_bbva.png";
import Chatbots from "./Chatbots";
import PopLlamada from "./PopLlamada";

const Llamada = (props) => {
  const state = props.data;
  if (props.data) {
    return (
      <div>
        <div>
          <span className="usuario-chatbot">
            <PopLlamada data={state} />
          </span>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Chatbots />
    </div>
  );
};
export default Llamada;
