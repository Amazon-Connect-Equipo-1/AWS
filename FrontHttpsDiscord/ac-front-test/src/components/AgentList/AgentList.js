/* Agent List
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import { useContext, useEffect, useState } from "react";
import "../../styles/AgentList/AgentList.css";
import { AgentAAndQAContext } from "../AgentsAAndQASupplier";
import AgentActiveCalls from "./AgentActiveCalls";
import AgentListMenu from "./AgentListMenu";
import AllAgentList from "./AllAgentsList";
import SingleAgent from "./SingleAgent";

//Create Constant Agent List
const AgentList = (props) => {
  //Logic to generate the rows
  const [arrAgents] = useContext(AgentAAndQAContext);

  //This info is for the agent card
  const [agentInfo, setAgentInfo] = useState(arrAgents[0]);

  const selectAgentHandler = (agent) => {
    setAgentInfo(agent);
  };

  return (
    <div className="agl-main-container" data-aos="fade-up">
      <AgentListMenu />
      <div
        className="agl-card-container"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <SingleAgent agent={agentInfo} />
        <AllAgentList onSelectAgent={selectAgentHandler} isActiveCalls={true} />
        <AgentActiveCalls isActiveCalls={false} />
      </div>
    </div>
  );
};

export default AgentList;
