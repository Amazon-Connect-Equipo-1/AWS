/* Agent List Menu
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import "../../styles/AgentList/AgentListMenu.css";
import { saveKeys, saveClick } from "../MonitorModule.js";
import { useTranslation } from "react-i18next";

const AgentListMenu = (props) => {
  const INPUT_NAME = "agent";
  // Language
  const { t } = useTranslation();

  return (
    <div className="aglm-menu-container">
      {/* <div className="aglm-button-container">
        <button
          onClick={() => saveClick(`${INPUT_NAME} main button`)}
          className="aglm-button-main"
        >
          {t("main")}
        </button>
        <button
          onClick={() => saveClick(`${INPUT_NAME} settings button`)}
          className="aglm-button-settings"
        >
          {t("settings")}
        </button>
      </div> */}
      <div className="aglm-search-container">
        <input
          className="aglm-search"
          id="aglm-search"
          type="search"
          placeholder={t("placeholder")}
          onClick={() => saveClick(`${INPUT_NAME} input`)}
          onKeyDown={saveKeys}
        />
        <select
          className="aglm-select"
          onClick={() => saveClick(`${INPUT_NAME} filter scroller`)}
        >
          <option value="Name">{t("date")}</option>
          <option value="Active Calls">{t("tag")}</option>
          <option value="Active Calls">{t("status")}</option>
        </select>
      </div>
    </div>
  );
};

export default AgentListMenu;
