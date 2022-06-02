/* Recover Password
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import "../../styles/Login/RecoverPassword.css";
import logo from "../../images/logo_bbva.png";
import LoginForm from "./LoginForm";
import ForgottenPasswordForm from "./ForgottenPasswordForm";
import NewPasswordForm from "./NewPasswordForm";

const RecoverPassword = (props) => {
  return (
    <div className="rp-main-container">
      <div className="rp-container">
        <img src={logo} alt="logo" className="rp-logo" />
        {/*<ForgottenPasswordForm />*/}
        <ForgottenPasswordForm />
      </div>
    </div>
  );
};

export default RecoverPassword;
