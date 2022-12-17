import { createContext, useReducer, ReactNode } from "react";

type Product = {
  description: string;
  id: string;
  price: number;
  student_price: number;
  title: string;
};

type StateType = {
  search: string;
  auth: {
    username: string;
    token: string;
    role: string;
  };
  productList: Product[];
};

const initState: StateType = {
  search: "",
  auth: {
    username: "",
    token: "",
    role: "",
  },
  productList: [],
};

export const StateContext = createContext({
  state: initState,
  login: (data: typeof initState.auth) => {},
  logout: () => {},
  setProductList: (productList: Product[]) => {},
  setSearchKeyword: (keyword: string) => {},
});

const StateContextProvider = ({ children }: { children: ReactNode }) => {
  const enum REDUCER_ACTION_TYPE {
    LOGIN,
    LOGOUT,
    SET_SEARCH_KEYWORD,
    SET_PRODUCT_LIST,
  }

  type ReducerAction = {
    type: REDUCER_ACTION_TYPE;
    payload?: string | Product[] | typeof initState.auth | undefined;
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

  const setProductList = (productList: Product[]) => {
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
