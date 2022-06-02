/* Agent List Settings
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import "../../styles/AgentList/AgListSet.css";
import "../../styles/AgentList/AgentListSwitch.css";
import AgentListSwitch from "./AgentListSwitch";
import { useState } from "react";

//Creates the constant Agent List Settings
const AgentListSetting = (props) => {
  return (
    <div className="al-settings">
      {props.setting}
      <AgentListSwitch />
    </div>
  );
};
export default AgentListSetting;
