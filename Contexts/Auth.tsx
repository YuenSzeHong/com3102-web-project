import { createContext, useState } from "react";

export type AuthContextState = {
  loggedUsername: string;
  role: string;
  token: string;
  search_keyword: string;
  login: (username: string, role: string, token: string) => void;
  logout: () => void;
  setSearchKeyword: (search_keyword: string) => void;
  productList: any[];
  setProductList: (productList: []) => void;
};

const initialAuthContextState: AuthContextState = {
  loggedUsername: "",
  role: "",
  token: "",
  search_keyword: "",
  login: () => {},
  logout: () => {},
  setSearchKeyword: () => {},
  productList: [],
  setProductList: () => {},
};

export const AuthContext = createContext<AuthContextState>(
  initialAuthContextState
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedUsername, setUsername] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [search_keyword, setSearchKeyword] = useState<string>("");
  const [productList, setProductList] = useState<any[]>([]);

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
      value={{
        loggedUsername,
        role,
        token,
        login,
        logout,
        search_keyword,
        setSearchKeyword,
        productList,
        setProductList,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
