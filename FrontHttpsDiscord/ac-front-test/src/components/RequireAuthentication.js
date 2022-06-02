import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthenticationContext } from "./Authentication";

const RequireAuthentication = ({ allowedUsers }) => {
  const [user, password, userType] = useContext(AuthenticationContext);
  const location = useLocation();
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuthentication;

/*
-> Solo revisa si existe un usuario que haya iniciado sesion
return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
-> Solo revisa si existe un usuario que haya iniciado sesion y el userType
  user?.userType?.find((user) => allowedUsers?.includes(user)) ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );

  userType?.find((user) => allowedUsers?.includes(user)) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );

  return userType === "Agent" || "Admin" || "QA" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
 */
