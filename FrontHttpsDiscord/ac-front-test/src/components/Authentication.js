/* Authentication
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import { createContext, useState } from "react";

export const AuthenticationContext = createContext();

const AuthenticationProvider = ({ children }) => {
  // State for Authentication
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const [userType, setUserType] = useState(null);

  // Login
  const login = (user, password, userType) => {
    setUser(user);
    setPassword(password);
    setUserType(userType);
  };

  // Logout
  const logout = () => {
    setUser(null);
    setPassword(null);
    setUserType(null);
  };

  return (
    <AuthenticationContext.Provider
      value={[user, password, userType, login, logout]}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
