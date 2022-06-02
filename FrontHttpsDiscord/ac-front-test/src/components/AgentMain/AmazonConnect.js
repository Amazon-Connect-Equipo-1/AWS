/* Amazon Connect
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import "amazon-connect-streams";
import "../../styles/AgentMain/AmazonConnect.css";
import ThirdParty from "./ThirdParty";
import { createContext, Suspense, useEffect, useState } from "react";
import EmbedConnect from "../AmazonConnect/EmbedConnect";

const AmazonConnect = (props) => {
  return (
    <div className="ac-main-container">
      <p className="ac-title">Amazon Connect</p>
      <div className="ac-viewer">
        <EmbedConnect />
      </div>
    </div>
  );
};
export default AmazonConnect;
