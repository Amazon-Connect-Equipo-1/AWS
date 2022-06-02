/* Recordings Card
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import Card from "../UI/Card";
import logo from "../../images/bbva_video.PNG";
import "../../styles/Recordings/RecordingsCard.css";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { RecordingsContext } from "../RecordingsSupplier";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

const RecordingsCard = (props) => {
  // const [, , selectedVideoInfo, setSelectedVideoInfo] =
  // useContext(RecordingsContext);

  //Logic to determine the tags

  // const printt = () => {
  //   setSelectedVideoInfo({
  //     id: props.record.id,
  //     agent: props.record.agent,
  //     agent_name: props.record.agent_name,
  //     tags: props.record.tags,
  //     miniatureURL: props.record.miniatureURL,
  //     videoURL: props.record.videoURL,
  //     rating: props.record.rating,
  //     date: props.record.date,
  //   });
  //   console.log(selectedVideoInfo);
  // };

  const adaptFontSize = () => {
    if (props.record.agent_name.length > 16) {
      return "rec-agent-name-small";
    } else if (props.record.agent_name.length > 13) {
      return "rec-agent-name-md";
    }
    return "";
  };

  const processTagName = (tagName) => {
    return tagName.includes("-") ? tagName.replace("-", " ") : tagName;
  };

  const { t } = useTranslation();
  return (
    <Link to="video" className="link">
      <Card className="rec-main-container">
        <div className="rec-container">
          <div className="rec-video-section">
            <div className="rec-video">
              <img
                src={logo}
                className="rec-video-img"
                onClick={props.onClickCard}
              ></img>
            </div>
            <div className="rec-video-info" onClick={props.onClickCard}>
              <h2 className={`rec-agent-name ${adaptFontSize()}`}>
                {props.record.agent_name}
              </h2>
              <h3 className="rec-date">{props.record.date}</h3>
              {/* <h3 className="rec-score">{getRating(props.record.rating)}</h3> */}
            </div>
          </div>
          <div className="rec-tag-section" onClick={props.onClickCard}>
            {props.record.tags.map((tag) => (
              <Card key={uuidv4()} className={`rec-tag ${tag} `}>
                {processTagName(t(tag))}
              </Card>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default RecordingsCard;
