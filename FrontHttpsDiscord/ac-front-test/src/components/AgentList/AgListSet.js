/* Agent List Set
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import "../../styles/AgentList/AgListSet.css";
import AgentListMenu from "./AgentListMenu";
import AgentListSetting from "./AgentListSetting";
import { useTranslation } from "react-i18next";


const AgListSet = (props) => {
  // Language
  const { t } = useTranslation();
  return (
    <div className="al-main-container">
      <AgentListMenu />
      <div className="al-sub-container">
        <div className="al-card-container">
          <p className="al-title">{t("alwayShow")}</p>
          <div className="al-divider"></div>
          <AgentListSetting setting={"Active Calls"} />
          <AgentListSetting setting={"All Agents"} />
          <AgentListSetting setting={"Online Agents"} />
          <AgentListSetting setting={"Offline Agents"} />
        </div>
        <div className="al-card-container-transparent"></div>
      </div>
    </div>
  );
};
export default AgListSet;
