import { createContext, useReducer, ReactNode } from "react";
import { initReactI18next } from "react-i18next";

const StateContextProvider = ({ children }: { children: ReactNode }) => {
  const enum REDUCER_ACTION_TYPE {
    LOGIN,
    LOGOUT,
    SET_SEARCH_KEYWORD,
    SET_PRODUCT_LIST,
  }

  type ReducerAction = {
    type: REDUCER_ACTION_TYPE;
    payload?: string | [] | typeof initState.auth | undefined;
  };

  const StateContext = createContext({});

  const initState = {
    search: "",
    auth: {
      username: "",
      token: "",
      role: "",
    },
    productList: [],
  };

  const reducer = (
    state: typeof initState,
    action: ReducerAction
  ): typeof initState => {
    switch (action.type) {
      case REDUCER_ACTION_TYPE.SET_SEARCH_KEYWORD:
        return {
          ...state,
          search: action.payload as string,
        };
      case REDUCER_ACTION_TYPE.SET_PRODUCT_LIST:
        return { ...state, productList: action.payload as [] };
      case REDUCER_ACTION_TYPE.LOGIN:
        return { ...state, auth: action.payload as typeof initState.auth };
      case REDUCER_ACTION_TYPE.LOGOUT:
        return { ...state, auth: { ...initState.auth } };

      default:
        throw new Error(`Invalid action ${action.type}`);
    }
  };

  const [state, dispatch] = useReducer(reducer, initState);
  const login = (data: typeof initState.auth) => {
    dispatch({ type: REDUCER_ACTION_TYPE.LOGIN, payload: data });
  };

  const logout = () => {
    dispatch({ type: REDUCER_ACTION_TYPE.LOGOUT });
  };

  const setSearchKeyword = (keyword: string) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.SET_SEARCH_KEYWORD,
      payload: keyword,
    });
  };

  const setProductList = (productList: []) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.SET_PRODUCT_LIST,
      payload: productList,
    });
  };

  return (
    <StateContext.Provider
      value={{ state, login, logout, setProductList, setSearchKeyword }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
