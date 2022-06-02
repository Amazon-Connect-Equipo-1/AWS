/* User Type
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import "../../styles/UserType/UserType.css";
import logo from "../../images/logo_bbva.png";
import UserTypeForm from "./UserTypeForm";

const UserType = (props) => {
  return (
    <div className="ut-main-container">
      <div className="ut-container">
        <img src={logo} alt="logo" className="log-logo" />
        <UserTypeForm />
      </div>
    </div>
  );
};

export default UserType;
