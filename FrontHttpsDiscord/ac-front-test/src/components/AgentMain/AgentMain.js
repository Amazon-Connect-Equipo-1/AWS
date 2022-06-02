/* Agent Main
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import "../../styles/AgentMain/AgentMain.css";
import ThirdPartyContainer from "./ThirdPartyContainer";
import TutorialsContainer from "../Tutorials/TutorialsContainer";
import AmazonConnect from "./AmazonConnect";
import RecordScreen from "./RecordScreen";

//Creates Main Agent
const AgentMain = (props) => {
  return (
    <div className="agM-main-container" data-aos="fade-up">
      <div
        className="agM-card-container"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <TutorialsContainer />
        <ThirdPartyContainer />
        <AmazonConnect />
      </div>
    </div>
  );
};
export default AgentMain;
