import { createContext, useReducer, ReactNode } from "react";

type Product = {
  description: string;
  id: string;
  price: number;
  student_price: number;
  title: string;
};

// define cartProduct type which have quantity and product details
type cartProduct = {
  quantity: number;
  product: Product;
};

type StateType = {
  search: string;
  auth: {
    username: string;
    token: string;
    role: string;
  };
  productList: Product[];
  cart: cartProduct[];
};

const initState: StateType = {
  search: "",
  auth: {
    username: "",
    token: "",
    role: "",
  },
  productList: [],
  cart: [],
};

export const StateContext = createContext({
  state: initState,
  login: (data: typeof initState.auth) => {},
  logout: () => {},
  setProductList: (productList: Product[]) => {},
  setSearchKeyword: (keyword: string) => {},
  addItemToCart: (product: Product) => {},
  increaseCartItemQuantity: (product: Product) => {},
  decreaseCartItemQuantity: (product: Product) => {},
  removeCartItem: (product: Product) => {},
});

const StateContextProvider = ({ children }: { children: ReactNode }) => {
  const enum REDUCER_ACTION_TYPE {
    LOGIN,
    LOGOUT,
    SET_SEARCH_KEYWORD,
    SET_PRODUCT_LIST,
    ADD_ITEM_TO_CART,
    INCREASE_CART_ITEM_QUANTITY,
    DECREASE_CART_ITEM_QUANTITY,
    REMOVE_CART_ITEM,
  }

  type ReducerAction = {
    type: REDUCER_ACTION_TYPE;
    payload?: Product | string | Product[] | typeof initState.auth | undefined;
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
      case REDUCER_ACTION_TYPE.ADD_ITEM_TO_CART:
        const lineItem = state.cart.find(
          (lineItem) => lineItem.product === lineItem.product
        );
        if (lineItem) {
          lineItem.quantity++;
          return { ...state, cart: [...state.cart] };
        } else {
          return {
            ...state,
            cart: [
              ...state.cart,
              { product: action.payload as Product, quantity: 1 },
            ],
          };
        }
      case REDUCER_ACTION_TYPE.INCREASE_CART_ITEM_QUANTITY:
        const lineItemToIncrease = state.cart.find(
          (item) => item.product === action.payload
        );
        if (lineItemToIncrease) {
          lineItemToIncrease.quantity++;
          return { ...state, cart: [...state.cart] };
        } else {
          return {
            ...state,
          };
        }
      case REDUCER_ACTION_TYPE.DECREASE_CART_ITEM_QUANTITY:
        const lineItemToDecrease = state.cart.find(
          (item) => item.product === action.payload
        );
        if (lineItemToDecrease) {
          lineItemToDecrease.quantity--;
          return { ...state, cart: [...state.cart] };
        } else {
          return {
            ...state,
            cart: [
              ...state.cart.filter((item) => item.product !== action.payload),
            ],
          };
        }
      case REDUCER_ACTION_TYPE.REMOVE_CART_ITEM:
        return {
          ...state,
          cart: [
            ...state.cart.filter((item) => item.product !== action.payload),
          ],
        };

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

  const addItemToCart = (product: Product) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.ADD_ITEM_TO_CART,
      payload: product,
    });
  };

  const increaseCartItemQuantity = (product: Product) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.INCREASE_CART_ITEM_QUANTITY,
      payload: product,
    });
  };

  const decreaseCartItemQuantity = (product: Product) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.DECREASE_CART_ITEM_QUANTITY,
      payload: product,
    });
  };

  const removeCartItem = (product: Product) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.REMOVE_CART_ITEM,
      payload: product,
    });
  };

  return (
    <StateContext.Provider
      value={{
        state,
        login,
        logout,
        setProductList,
        setSearchKeyword,
        addItemToCart,
        increaseCartItemQuantity,
        decreaseCartItemQuantity,
        removeCartItem,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
