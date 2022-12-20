import axios from "axios";
import { createContext, useReducer, ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { cartProduct, Product, StateType } from "../types";

const initState: StateType = {
  search: "",
  auth: {
    username: "",
    token: "",
    role: "",
  },
  productList: [],
  filteredList: [],
  cart: [],
};

export const StateContext = createContext({
  state: initState,
  login: (data: typeof initState.auth) => {},
  logout: () => {},
  setProductList: (productList: Product[]) => {},
  setFilteredList: (filteredList: Product[]) => {},
  setSearchKeyword: (keyword: string) => {},
  addItemToCart: (product: Product) => {},
  incrementItem: (id: string) => {},
  decrementItem: (id: string) => {},
  removeItem: (id: string) => {},
  emptyCart: () => {},
  getItemCount: (): number => 0,
  getTotalPrice: (role: string, cart: cartProduct[]): number => 0,
  getSubTotal: (row: cartProduct): number => 0,
  formatPrice: (price: number): string => "",
});

const StateContextProvider = ({ children }: { children: ReactNode }) => {
  const enum REDUCER_ACTION_TYPE {
    LOGIN,
    LOGOUT,
    SET_SEARCH_KEYWORD,
    SET_FILTERED_LIST,
    SET_PRODUCT_LIST,
    ADD_ITEM_TO_CART,
    INCREASE_CART_ITEM_QUANTITY,
    DECREASE_CART_ITEM_QUANTITY,
    REMOVE_CART_ITEM,
    EMPTY_CART,
  }

  type ReducerAction = {
    type: REDUCER_ACTION_TYPE;
    payload?: Product | string | Product[] | typeof initState.auth | undefined;
  };

  const { i18n } = useTranslation();

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
      case REDUCER_ACTION_TYPE.SET_FILTERED_LIST:
        return { ...state, filteredList: action.payload as [] };
      case REDUCER_ACTION_TYPE.LOGIN:
        sessionStorage.setItem("auth", JSON.stringify(action.payload));
        return {
          ...state,
          filteredList: [],
          productList: [],
          auth: action.payload as typeof initState.auth,
        };
      case REDUCER_ACTION_TYPE.LOGOUT:
        sessionStorage.removeItem("auth");
        localStorage.removeItem("auth");
        return { ...state, auth: { ...initState.auth } };
      case REDUCER_ACTION_TYPE.ADD_ITEM_TO_CART:
        const lineItem = state.cart.find(
          (lineItem) => lineItem.product === action.payload
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
          (item) => item.product.id === action.payload
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
          (item) => item.product.id === action.payload
        );
        if (!lineItemToDecrease) return { ...state };
        if (lineItemToDecrease?.quantity > 1) {
          lineItemToDecrease.quantity--;
          return { ...state, cart: [...state.cart] };
        } else {
          return {
            ...state,
            cart: [
              ...state.cart.filter(
                (item) => item.product.id !== action.payload
              ),
            ],
          };
        }
      case REDUCER_ACTION_TYPE.REMOVE_CART_ITEM:
        return {
          ...state,
          cart: [
            ...state.cart.filter((item) => item.product.id !== action.payload),
          ],
        };
      case REDUCER_ACTION_TYPE.EMPTY_CART:
        return {
          ...state,
          cart: [],
        };

      default:
        throw new Error(`Invalid action ${action.type}`);
    }
  };

  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      state.cart = JSON.parse(cart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  const login = (data: typeof initState.auth) => {
    dispatch({ type: REDUCER_ACTION_TYPE.LOGIN, payload: data });
  };

  const logout = () => {
    dispatch({ type: REDUCER_ACTION_TYPE.LOGOUT });
    localStorage.removeItem("cart");
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

  const setFilteredList = (filteredList: Product[]) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.SET_FILTERED_LIST,
      payload: filteredList,
    });
  };

  const addItemToCart = (product: Product) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.ADD_ITEM_TO_CART,
      payload: product,
    });
  };

  const increaseCartItemQuantity = (id: string) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.INCREASE_CART_ITEM_QUANTITY,
      payload: id,
    });
  };

  const decreaseCartItemQuantity = (id: string) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.DECREASE_CART_ITEM_QUANTITY,
      payload: id,
    });
  };

  const removeCartItem = (id: string) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.REMOVE_CART_ITEM,
      payload: id,
    });
  };

  const emptyCart = () => {
    dispatch({
      type: REDUCER_ACTION_TYPE.EMPTY_CART,
    });
  };

  const getItemCount = () => {
    return state.cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const getSubTotal = (row: cartProduct) => {
    return (
      (state.auth.role === "student"
        ? row.product.student_price
        : row.product.price | row.product.price) * row.quantity
    );
  };

  const getTotalPrice = (role: string, cart: cartProduct[]) => {
    return cart.reduce(
      (acc, item) =>
        acc +
        (role === "student"
          ? item.product.student_price
          : item.product.price | item.product.price) *
          item.quantity,
      0
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(i18n.language, {
      style: "currency",
      currency: "HKD",
    }).format(price);
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
        incrementItem: increaseCartItemQuantity,
        decrementItem: decreaseCartItemQuantity,
        removeItem: removeCartItem,
        emptyCart,
        getItemCount: getItemCount,
        getTotalPrice: getTotalPrice,
        getSubTotal: getSubTotal,
        formatPrice,
        setFilteredList,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
