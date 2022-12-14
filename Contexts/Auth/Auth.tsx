import React, { useState } from "react";

const initialState = {
  username: "",
  role: "",
  token: "",
};

const AuthContext = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState(initialState);

  const login = (username: string, role: string, token: string) => {
    setAuthState({
      username,
      role,
      token,
    });
  };

  const logout = () => {
    setAuthState(initialState);
  };

  const isLoggedIn = () => {
    return authState.token !== "";
  };

  const getUserRole = () => {
    return authState.role;
  };

  return <>{children}</>;
};

export default AuthContext;