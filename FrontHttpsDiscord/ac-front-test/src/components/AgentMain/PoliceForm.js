/* Police From
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import "../../styles/AgentMain/ThirdParty.css";
import ThirdParty from "./ThirdParty";
import { saveKeys, saveClick } from "../MonitorModule.js";
import { useTranslation } from "react-i18next";

//Creates the Police Form
const PoliceForm = (props) => {
  const INPUT_NAME = "police form";
  // Language
  const { t } = useTranslation();

  return (
    <div>
      <div className="tp-title">{t("police")}</div>
      <form>
        <label className="tp-name-label">
          {t("client")}
          <input
            type="text"
            onKeyDown={saveKeys}
            onClick={() => saveClick(`${INPUT_NAME} input`)}
            className="tp-input-label"
          />
        </label>
        <label className="tp-name-label">
          {t("email")}
          <input
            type="text"
            onKeyDown={saveKeys}
            onClick={() => saveClick(`${INPUT_NAME} input`)}
            className="tp-input-label"
          />
        </label>
        <label className="tp-name-label">
          {t("phone")}
          <input
            type="text"
            onKeyDown={saveKeys}
            onClick={() => saveClick(`${INPUT_NAME} input`)}
            className="tp-input-label"
          />
        </label>
        <label className="tp-name-label">
          {t("clientLocation")}
          <input
            type="text"
            onKeyDown={saveKeys}
            onClick={() => saveClick(`${INPUT_NAME} input`)}
            className="tp-input-label"
          />
        </label>
        <label className="tp-name-label">
          {t("destination")}
          <input
            type="text"
            onKeyDown={saveKeys}
            onClick={() => saveClick(`${INPUT_NAME} input`)}
            className="tp-input-label"
          />
        </label>
        <div className="tp-submit">
          <input
            type="submit"
            onKeyDown={saveKeys}
            onClick={(e) => {
              e.preventDefault();
              props.onChange();
              saveClick(`${INPUT_NAME} input`);
            }}
            value={t("askForService")}
            className="tp-submit-button"
          />
        </div>
      </form>
    </div>
  );
};
export default PoliceForm;
