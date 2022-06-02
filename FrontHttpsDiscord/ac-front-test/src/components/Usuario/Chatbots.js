/* Chatbot
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import "../../styles/Usuario/Usuario.css";
import "../../styles/Usuario/Chatbots.css";
//import logo from "../../images/logo_bbva.png";
const Chatbots = (props) => {
  return (
    <div>
      <span className="usuario-chatbot">
        <iframe
          className="chatbot"
          src="https://widget.kommunicate.io/chat?appId=2ab92030927ade8fc112f89b5f867a9c0"
          frameborder="0"
          allowfullscreen
          allow="microphone; geolocation;"
        ></iframe>
      </span>
    </div>
  );
};
export default Chatbots;
