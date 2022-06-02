/* Profile
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import "../../styles/Profile/Profile.css";
import prfl_ic from "../../images/profile_icon.png";
import { useContext } from "react";
import { GlobalContext } from "../GlobalSupplier";
import { AuthenticationContext } from "../Authentication";

const Profile = (props) => {
  const [, , userInfo] = useContext(GlobalContext);
  console.log(userInfo);

  const [, , , , logout] = useContext(AuthenticationContext);

  const logoutHandler = (event) => {
    logout();
    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("userType");
    window.localStorage.removeItem("name");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("id");
    window.localStorage.removeItem("email");
    window.location.reload();
  };

  return (
    <div className="prfl-main-container" data-aos="fade-up">
      <div
        className="prfl-sub-container"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="prfl-container">
          <img src={prfl_ic} alt="profile_ic" className="prfl-ic" />
          <div className="prfl-info-container">
            <p className="prfl-name">{window.localStorage.getItem("name")}</p>
            <br />
            <p className="prfl-label">Id</p>
            <p className="prfl-label-info">
              {window.localStorage.getItem("id")}
            </p>
            <br />
            <p className="prfl-label">Email</p>
            <p className="prfl-label-info">
              {window.localStorage.getItem("email")}
            </p>
            <button className="prfl-button" onClick={logoutHandler}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
