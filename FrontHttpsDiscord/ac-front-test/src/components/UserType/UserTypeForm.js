/* User Type Form
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import Card from "../UI/Card";
import "../../styles/UserType/UserTypeForm.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const UserTypeForm = (props) => {
  // Language
  const { t } = useTranslation();
  return (
    <Card className="utf-main-container">
      <div className="utf-container ">
        <form className="utf-form">
          <p className="utf-form-title">{t("selectUserType")}</p>
          <Link to="login">
            <button className="utf-button">{t("utAgent")}</button>
          </Link>
          <Link to="login">
            <button className="utf-button">{t("utClient")}</button>
          </Link>
        </form>
      </div>
    </Card>
  );
};

export default UserTypeForm;
