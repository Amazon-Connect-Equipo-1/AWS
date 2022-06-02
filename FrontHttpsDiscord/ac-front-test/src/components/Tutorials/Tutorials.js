/* Tutorial
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "../../styles/Tutorials/Tutorials.css";
import CardBlocking from "../../pdf/CardBlocking.pdf";
import CardCancellation from "../../pdf/CardCancellation.pdf";
import CardRejected from "../../pdf/CardRejected.pdf";
import ReportUnrecognizedCharges from "../../pdf/ReportUnrecognizedCharges.pdf";
import RequestNewPlastic from "../../pdf/RequestNewPlastic.pdf";
import RequestThirdPartyService from "../../pdf/RequestThirdPartyService.pdf";
import SelectBestVideos from "../../pdf/SelectBestVideos.pdf";
import { saveClick } from "../MonitorModule.js";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Tutorials = () => {
  const INPUT_NAME = "agent tutorials";

  const [pdfFile, setPdfFile] = useState(CardBlocking);

  function choosePdf(n) {
    setPdfFile(n);
  }

  // Language
  const { t } = useTranslation();

  return (
    <div className="t-sub-container">
      <h2 className="t-title">{t("systemHelp")}</h2>
      <div className="t-container">
        <select
          className="t-select"
          onChange={(t) => choosePdf(t.target.value)}
        >
          <option value={CardBlocking}>{t("cardBlocking")}</option>
          <option value={CardCancellation}>{t("cardCancellation")}</option>
          <option value={CardRejected}>{t("cardRejected")}</option>
          <option value={ReportUnrecognizedCharges}>
            {t("reportUnrecognizedCharges")}
          </option>
          <option value={RequestNewPlastic}>{t("requestNewPlastic")}</option>
          <option value={RequestThirdPartyService}>
            {t("requestThirdPartyServices")}
          </option>
          <option value={SelectBestVideos}>{t("selectBestVideos")}</option>
        </select>
      </div>
      <div className="viewer">
        <iframe className="t-pdf" src={`${pdfFile}#toolbar=0&navpanes=0`} />
      </div>
    </div>
  );
};

export default Tutorials;
