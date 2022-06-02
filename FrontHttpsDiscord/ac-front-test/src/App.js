/* APP
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import "./App.css";
import Login from "./components/Login/Login";
import RecoverPassword from "./components/Login/RecoverPassword";
import Register from "./components/Login/Register";
import Profile from "./components/Profile/Profile";
import Recordings from "./components/Recordings/Recordings";
import Usuario from "./components/Usuario/Usuario";
import UserType from "./components/UserType/UserType";
import RecordingsVideo from "./components/Recordings/RecordingsVideo";
import Navbar from "./components/Menu/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Statistics from "./components/Statistics/Statistics";
import Settings from "./components/Settings/Settings";
import AgentList from "./components/AgentList/AgentList";
import { Fragment, Suspense, useContext, useEffect, useState } from "react";
import LocaleContext from "./LocaleContext";
import i18n from "./i18n";
import Loading from "./components/Loading";
import RecordingsSupplier from "./components/RecordingsSupplier";
import Error from "./components/Error/Error";
import AgentMain from "./components/AgentMain/AgentMain";
import QualityControl from "./components/QualityControl/QualityControl";
import AgentsAAndQASupplier from "./components/AgentsAAndQASupplier";
import GlobalSupplier from "./components/GlobalSupplier";
import { loadUserPreferences } from "./components/UserPreferences";
import NewPassword from "./components/Login/NewPassword";
import "amazon-connect-streams";
import { Navigate, Route, Router, Routes, useLocation } from "react-router-dom";
import { AuthenticationContext } from "./components/Authentication";
import AgentRecordingsSupplier from "./components/AgentRecordingsSupplier";
import AOS from "aos";
import "aos/dist/aos.css";
import Layout from "./components/Layout";
import RequireAuthentication from "./components/RequireAuthentication";

function App() {
  // Variable that determines the types of users to protect the routes
  const USER = {
    Admin: "Admin",
    QA: "Quality-agent",
    Agent: "Agent",
    Client: "Client",
  };

  // Load user preferences
  loadUserPreferences();

  // Language
  const [locale, setLocale] = useState(i18n.language);
  i18n.on("languageChanged", (lng) => setLocale(i18n.language));

  // Authentication
  const [user, , userType] = useContext(AuthenticationContext);
  //console.log(user);
  //console.log(userType);
  const getUserType = window.localStorage.getItem("userType");
  const location = useLocation();

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div className="App">
      <GlobalSupplier>
        <LocaleContext.Provider value={{ locale, setLocale }}>
          <Suspense fallback={<Loading />}>
            {/*user !== null && <Navbar sidebarData={userType} />*/}
            {getUserType === USER.Admin && <Navbar sidebarData={USER.Admin} />}
            {getUserType === USER.QA && <Navbar sidebarData="QA" />}
            {getUserType === USER.Agent && <Navbar sidebarData={USER.Agent} />}
            <Routes>
              <Route path="/" element={<Layout />}>
                {/*Public Routes*/}
                <Route path="login" element={<Login />} />
                <Route path="forgot-password" element={<RecoverPassword />} />
                <Route path="client" element={<Usuario />} />
                <Route path="register-user" element={<Register />} />

                {/*Routes for all types of users*/}
                <Route
                  element={
                    <RequireAuthentication
                      allowedUsers={[USER.Admin, USER.QA, USER.Agent]}
                    />
                  }
                >
                  <Route path="profile" element={<Profile />} />
                  <Route path="settings" element={<Settings />} />
                  <Route
                    path="/"
                    element={
                      <Navigate
                        to={
                          (getUserType === USER.Admin && "/admin") ||
                          (getUserType === USER.QA && "/qa") ||
                          (getUserType === USER.Agent && "/agent")
                        }
                        state={{ from: location }}
                        replace
                      />
                    }
                  />
                </Route>

                {/*Admin Routes*/}
                <Route
                  element={
                    <RequireAuthentication allowedUsers={[USER.Admin]} />
                  }
                >
                  <Route path="admin" element={<Dashboard />} />
                </Route>

                {/*Routes shared by QA and Admin*/}
                <Route
                  element={
                    <RequireAuthentication
                      allowedUsers={[USER.Admin, USER.QA]}
                    />
                  }
                >
                  <Route
                    path="agents"
                    element={
                      <AgentsAAndQASupplier>
                        <AgentList />
                      </AgentsAAndQASupplier>
                    }
                  />
                  <Route path="statistics" element={<Statistics />} />
                </Route>

                {/*QA Routes*/}
                <Route
                  element={<RequireAuthentication allowedUsers={[USER.QA]} />}
                >
                  <Route path="qa" element={<Dashboard />} />
                  <Route
                    path="recordings"
                    element={
                      <RecordingsSupplier>
                        <Recordings />
                      </RecordingsSupplier>
                    }
                  >
                    <Route
                      path="main"
                      index
                      element={
                        <RecordingsSupplier>
                          <Recordings />
                        </RecordingsSupplier>
                      }
                    />
                    <Route path="video" element={<RecordingsVideo />} />
                  </Route>
                </Route>

                {/*Agent Routes*/}
                <Route
                  element={
                    <RequireAuthentication allowedUsers={[USER.Agent]} />
                  }
                >
                  <Route path="agent" element={<AgentMain />} />
                  <Route
                    path="agent-qa"
                    element={
                      <AgentRecordingsSupplier>
                        <QualityControl />
                      </AgentRecordingsSupplier>
                    }
                  />
                </Route>

                {/*Catch all*/}
                <Route path="*" element={<Error interface={userType} />} />
              </Route>
            </Routes>
          </Suspense>
        </LocaleContext.Provider>
      </GlobalSupplier>
    </div>
  );
}

export default App;
