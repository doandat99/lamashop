import {
  ADD_TO_CART,
  REMOVE_PRODUCT_TO_CART,
  INCREASE_PRODUCT,
  DECREASE_PRODUCT,
} from "./actiontype";

export const addToCart = (value) => {
  return {
    type: ADD_TO_CART,
    payload: value,
  };
};

export const removeProductToCart = (id) => {
  return {
    type: REMOVE_PRODUCT_TO_CART,
    payload: id,
  };
};

export const increaseProductToCart = (id) => {
  return {
    type: INCREASE_PRODUCT,
    payload: id,
  };
};

export const decreaseProductToCart = (id) => {
  return {
    type: DECREASE_PRODUCT,
    payload: id,
  };
};
