/* Recordings
Authors:
        A01777771 Stephen Strange*/

//Import Modules

import "../../styles/AgentRecordings/AgentRecordings.css";
import { useContext } from "react";
import { saveKeys, saveClick } from "../MonitorModule.js";
import { useTranslation } from "react-i18next";
import { Outlet, useOutlet } from "react-router-dom";
import { AgentRecordingsContext } from "../AgentRecordingsSupplier";
import RecordingsCard from "../Recordings/RecordingsCard";

const AgentRecordings = () => {
  // Language
  const { t } = useTranslation();

  const [arrRecordings] = useContext(AgentRecordingsContext);
  const INPUT_NAME = "agent recordings";

  //Variable to verify if an outlet exists
  // It is expected that the outlet is <AgentRecordingsVideo />
  const outlet = useOutlet();

  return (
    <>
      {outlet || (
        <div className="arc-main-container" data-aos="fade-up">
          <div className="arc-container">
            <div className="arc-search-container">
              <select
                className="arc-select"
                onClick={() => saveClick(`${INPUT_NAME} filter scroller`)}
              >
                {/* <option>{t("search")}</option> */}
                <option value="date">{t("date")}</option>
                <option value="tag">{t("tag")}</option>
              </select>
              <input
                onKeyDown={saveKeys}
                onClick={() => saveClick(`${INPUT_NAME} input`)}
                className="arc-input"
                type="text"
                placeholder={t("placeholder")}
              />
              <button href="/" className="arc-btn">
                {t("search")}
              </button>
            </div>
            {arrRecordings.map((record_info) => (
              <RecordingsCard
                id={record_info.id}
                key={record_info.id}
                record={record_info}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AgentRecordings;
