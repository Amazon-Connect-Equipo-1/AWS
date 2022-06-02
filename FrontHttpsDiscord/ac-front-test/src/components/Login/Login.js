/* Login
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import "../../styles/Login/Login.css";
import logo from "../../images/logo_bbva.png";
import LoginForm from "./LoginForm";

const Login = (props) => {
  return (
    <div className="log-main-container">
      <div className="log-container">
        <img src={logo} alt="logo" className="log-logo" />
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
