import { createContext, useContext, useState } from "react";
export const AuthContext = createContext();

export const Authprovider = ({ children }) => {
  const [token, setToken] = useState({ token: localStorage.getItem("Token") });

  const islogedIn = !!token.token;

  const logoutUser = () => {
    localStorage.removeItem("Token");
    setToken({ token: null });
  };

  const storeTokenInLs = (token) => {
    localStorage.setItem("Token", token);
  };
  return (
    <AuthContext.Provider value={{ storeTokenInLs, logoutUser, islogedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
