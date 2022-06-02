/* Recordings Video
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import "../../styles/Recordings/RecordingsVideo.css";
import video from "../../images/bbva_video.PNG";
import AboutCard from "./AboutCard";
import Card from "../UI/Card";
import GiveFeedbackCard from "./GiveFeedbackCard";
import AgentFeedbackCard from "../QualityControl/AgentFeedbackCard";
import { useState } from "react";

const RecordingsVideo = (props) => {
  // const card = 2; //1: about, 2: QA Feedback
  const [cardName, setCardName] = useState("About");

  const changeCardHandler = () => {
    if (cardName === "About") {
      setCardName("Feedback");
    } else {
      setCardName("About");
    }
  };

  return (
    <Card className="rev-main-container">
      <div
        className="rev-container"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <iframe
          className="rev-video"
          src="https://www.youtube.com/embed/0Kvw2BPKjz0"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        {cardName === "About" && <AboutCard onChangeCard={changeCardHandler} />}
        {cardName === "Feedback" && (
          <GiveFeedbackCard onChangeCard={changeCardHandler} />
        )}
        {/* {card === 3 && <AgentFeedbackCard />} */}
      </div>
    </Card>
  );
};

export default RecordingsVideo;
