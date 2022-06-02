/* New Password
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import logo from "../../images/logo_bbva.png";
import NewPasswordForm from "./NewPasswordForm";
import "../../styles/Login/NewPassword.css";

const NewPassword = () => {
  return (
    <div className="nps-main-container">
      <div className="nps-container">
        <img src={logo} alt="logo" className="nps-logo" />
        <NewPasswordForm />
      </div>
    </div>
  );
};

export default NewPassword;
