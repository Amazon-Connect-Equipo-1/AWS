/* Queality Control
Authors:
        A01777771 Stephen Strange*/

import AgentRecordings from "../AgentRecordings/AgentRecordings";
import "../../styles/AgentQualityControl/AgentQualityControl.css";
import AgentFeedbackCard from "./AgentFeedbackCard";

const QualityControl = (props) => {
  return (
    <div className="aqc-main-container">
      <div className="aqc-container">
        <AgentRecordings />
        <AgentFeedbackCard className="aqc-feedback-card" />
      </div>
    </div>
  );
};
export default QualityControl;
