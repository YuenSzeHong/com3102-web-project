import { createContext, useState } from "react";

export type AuthContextState = {
  loggedUsername: string;
  role: string;
  token: string;
  login: (username: string, role: string, token: string) => void;
  logout: () => void;
};

const initialAuthContextState: AuthContextState = {
  loggedUsername: "",
  role: "",
  token: "",
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthContextState>(
  initialAuthContextState
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedUsername, setUsername] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [token, setToken] = useState<string>("");

  const login = (username: string, role: string, token: string) => {
    setUsername(username);
    setRole(role);
    setToken(token);
  };

  const logout = () => {
    setUsername("");
    setRole("");
    setToken("");
  };

  return (
    <AuthContext.Provider
      value={{ loggedUsername, role, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
