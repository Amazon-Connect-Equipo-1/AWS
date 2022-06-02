/* Agent Active Calls
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import "../../styles/AgentList/AllAgentsList.css";
import AgentRow from "./AgentRow";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { AgentAAndQAContext } from "../AgentsAAndQASupplier";

//Create const Agent Active Calls
const AgentActiveCalls = (props) => {
  // Language
  const { t } = useTranslation();

  //Logic to generate the rows
  const [arrAgents] = useContext(AgentAAndQAContext);

  const arrAgentsWorking = arrAgents.filter((agent) => {
    return agent.working;
  });

  return (
    <div className="aal-main-container">
      <p className="aal-title">{t("activeCalls")}</p>
      <div>
        {arrAgentsWorking.map((agent) => (
          <AgentRow
            agentName={agent.agentName}
            isActiveCalls={props.isActiveCalls}
          />
        ))}
      </div>
    </div>
  );
};

export default AgentActiveCalls;
