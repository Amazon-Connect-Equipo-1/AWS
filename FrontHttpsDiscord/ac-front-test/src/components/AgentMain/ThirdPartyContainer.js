/* Third Party Container
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import "../../styles/AgentMain/ThirdParty.css";
import ThirdParty from "./ThirdParty";
import { createContext, Suspense, useState } from "react";

const ThirdPartyContainer = (props) => {
  return (
    <div className="tp-main-container">
      <ThirdParty />
    </div>
  );
};
export default ThirdPartyContainer;
