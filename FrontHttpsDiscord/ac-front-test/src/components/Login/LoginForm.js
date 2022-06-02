/* LoginForm.js
Authors: 
- 
*/

// Import Modules
import Card from "../UI/Card";
import "../../styles/Login/LoginForm.css";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthenticationContext } from "../Authentication";

const LoginForm = (props) => {
  // Language
  const { t } = useTranslation();

  // Authentication
  const [user, password, userType, login, logout] = useContext(
    AuthenticationContext
  );

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [token, setToken] = useState("");

  // USERS
  const USER = {
    Admin: "Admin",
    QA: "Quality-agent",
    Agent: "Agent",
    Client: "Client",
  };

  // Test Users
  const testUsers = [
    {
      id: 1,
      name: "Jack Pearson",
      email: "agent@gmail.com",
      password: "1234",
      user_type: "Agent",
    },
    {
      id: 2,
      name: "Susan Watson",
      email: "qa@gmail.com",
      password: "1234",
      user_type: "QA",
    },
    {
      id: 3,
      name: "Julia Garner",
      email: "admin@gmail.com",
      password: "1234",
      user_type: "Admin",
    },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  //const from = location.state?.from?.pathname || "/";

  // Attend the event of change in the email input
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  // Attend the event of change in the email input
  const pwdChangeHandler = (event) => {
    setPwd(event.target.value);
  };

  // Attend the click button
  const loginSubmitHandler = (event) => {
    event.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // const myHeadersToken = new Headers();
    // myHeadersToken.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      email: email,
      password: pwd,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    // const requestOptionsGET = {
    //   method: "GET",
    //   headers: myHeadersToken,
    //   body: raw,
    //   redirect: "follow",
    // };

    fetch("http://35.88.250.238:8080/auth/signIn", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        window.localStorage.setItem("isLoggedIn", true);
        const resultJSON = JSON.parse(result);
        console.log(resultJSON);
        window.localStorage.setItem("userType", resultJSON.role);
        window.localStorage.setItem("email", email);
        window.localStorage.setItem("token", resultJSON.AccessToken);
        console.log(resultJSON.AccessToken);

        if (resultJSON.role === USER.Admin) {
          navigate("/admin", { replace: true });
        }
        if (resultJSON.role === USER.QA) {
          console.log("Mikeeee");
          const myHeadersToken = new Headers();
          myHeadersToken.append(
            "Authorization",
            `Bearer ${resultJSON.AccessToken}`
          );

          const requestOptionsGET = {
            method: "GET",
            headers: myHeadersToken,
          };

          //Save manager info in local storage
          fetch(
            `http://35.88.250.238:8080/manager/managerProfile?email=${email}`,
            requestOptionsGET
          )
            .then((response) => response.text())
            .then((result) => {
              const resultJSON = JSON.parse(result);
              console.log(resultJSON);
              window.localStorage.setItem("name", resultJSON.manager_name);
              window.localStorage.setItem("id", resultJSON.manager_id);
            })
            .catch((error) => console.log("error", error));
          navigate("/qa", { replace: true });
        }
        if (resultJSON.role === USER.Agent) {
          const myHeadersToken = new Headers();
          myHeadersToken.append(
            "Authorization",
            `Bearer ${resultJSON.AccessToken}`
          );

          const requestOptionsGET = {
            method: "GET",
            headers: myHeadersToken,
          };

          //Save manager info in local storage
          fetch(
            `http://35.88.250.238:8080/agent/agentProfile?email=${email}`,
            requestOptionsGET
          )
            .then((response) => response.text())
            .then((result) => {
              const resultJSON = JSON.parse(result);
              console.log("mike");
              console.log(resultJSON);
              // console.log(resultJSON.body);
              console.log("mike");
              window.localStorage.setItem("id", resultJSON.agent_id);
              window.localStorage.setItem("name", resultJSON.name);
              window.localStorage.setItem("status", resultJSON.status);
              window.localStorage.setItem("calls", resultJSON.calls);
              window.localStorage.setItem("rating", resultJSON.rating);
              window.localStorage.setItem(
                "profile_picture",
                resultJSON.profile_picture
              );
            })
            .catch((error) => console.log("error", error));
          navigate("/agent", { replace: true });
        }
      })
      .catch((error) => console.log("error", error));

    console.log(user);
    console.log(userType);
    console.log("Submit form is working");
  };

  return (
    <Card className="lgf-main-container">
      <div className="lgf-container ">
        <form className="lgf-form" onSubmit={loginSubmitHandler}>
          <p className="lgf-form-title">{t("signIn")}</p>
          <label className="lgf-label lgf-margin-bottom-sm ">Email</label>
          <input
            id="lgf-email"
            type="email"
            className="lgf-input"
            onChange={emailChangeHandler}
            value={email}
          />
          <div className="lgf-flex">
            <label className=" lgf-label lgf-margin-bottom-sm lgf-margin-top-md">
              {t("password")}
            </label>
            <NavLink to="/forgot-password" className="lgf-forgot-text">
              {t("fyp")}
            </NavLink>
          </div>
          <input
            type="password"
            className="lgf-input"
            onChange={pwdChangeHandler}
            value={pwd}
          />
          <button className="lgf-button">{t("signInBtn")}</button>
        </form>
      </div>
    </Card>
  );
};

export default LoginForm;
