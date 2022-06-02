/* Agent List Switch
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import "../../styles/AgentList/AgentListSwitch.css";
import React from "react";
import { useState } from "react";

//Creates de constant Agent List Switch y checa la lista
const AgentListSwitch = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const check = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <label className="al-switch">
        <input type="checkbox" checked={isChecked} onClick={check} />
        <span className="al-slider" />
      </label>
    </div>
  );
};
export default AgentListSwitch;
