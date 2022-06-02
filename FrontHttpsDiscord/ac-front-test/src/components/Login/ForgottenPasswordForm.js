/* Forgotten Password Form
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import "../../styles/Login/ForgottenPasswordForm.css";
import logo from "../../images/logo_bbva.png";
import { useTranslation } from "react-i18next";
import Card from "../UI/Card";

//Creates the constant Forgotten Password
const ForgottenPasswordForm = (props) => {
  // Language
  const { t } = useTranslation();
  return (
    <Card className="fpf-main-container">
      <div className="fpf-container ">
        <form className="fpf-form">
          <p className="fpf-form-title">{t("changePassword")}</p>
          <label className="fpf-label fpf-margin-bottom-sm " for="lgf-email">
            {t("rpEmail")}
          </label>
          <input id="fpf-email" type="email" className="fpf-input" />
          <div className="fpf-flex">
            <label className=" fpf-label fpf-margin-bottom-sm fpf-margin-top-md">
              {t("token")}
            </label>
          </div>
          <input type="password" className="fpf-input" />
          <button type="submit" className="fpf-button">
            {t("recoverPasswordBtn")}
          </button>
        </form>
      </div>
    </Card>
  );
};

export default ForgottenPasswordForm;
