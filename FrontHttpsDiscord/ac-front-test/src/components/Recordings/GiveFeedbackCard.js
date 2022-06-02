/* Give Feedback Card
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import Card from "../UI/Card";
import "../../styles/Recordings/GiveFeedbackCard.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const GiveFeedbackCard = (props) => {
  // Language
  const { t } = useTranslation();

  const [feedback, setFeedback] = useState("");

  const changeFeedbackHandler = (event) => {
    setFeedback(event.target.value);
    console.log(feedback);
  };
  // Logic

  //petition to determine if the QA has given feedback befor
  // if he has, don´t let him give feedback again
  // else turn on the functionality of the button

  const sendFeedback = () => {
    //PP petition to send the feedback
    if (feedback !== "" && feedback.trim().length !== 0) {
      console.log(feedback);
      console.log("a");
    }
  };

  return (
    <Card className="gfc-main-container">
      <div className="gfc-container">
        <div>
          <div className="gfc-navbar">
            <h2 className="gfc-title" onClick={props.onChangeCard}>
              {t("about")}
            </h2>
            <h2 className="gfc-title">{t("feedback")}</h2>
          </div>
        </div>
        {/* <div>
          <h3>{t("yourFeedback")}</h3>
          <h3 className="gfc-feeback-score">🖖🖖🖖🖖🖖</h3>
        </div> */}
        <textarea
          className="gfc-input"
          type="text"
          onChange={changeFeedbackHandler}
        />
        <button className="gfc-send-btn" onClick={sendFeedback}>
          Send
        </button>
      </div>
    </Card>
  );
};

export default GiveFeedbackCard;
