/* Agent Row
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import "../../styles/AgentList/AllAgentsList.css";
import profile_thumbnail from "../../images/profile_icon.png";
import telephone from "../../images/telephone_call.png";
import { useTranslation } from "react-i18next";

//Creates the constant Agent Row
const AgentRow = (props) => {
  const circleColor = props.isWorking ? "aal-online" : "aal-offline";

  return (
    <div className="aal-row-container">
      <img
        className="aal-profile-picture"
        src={profile_thumbnail}
        alt="Profile picture"
      />
      <p className="aal-text">{props.agentName}</p>
      {props.isActiveCalls && <div className={`circulo ${circleColor}`}></div>}
      <img
        className="aal-telephone-picture"
        src={telephone}
        alt="Telephone picture"
      />
    </div>
  );
};

export default AgentRow;
