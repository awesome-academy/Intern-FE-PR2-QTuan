import { cartCase } from "../constants";

export function addToCartAction(params) {
  return {
    type: cartCase.addToCart,
    payload: params,
  };
}

export function removeFromCartAction(params) {
  return {
    type: cartCase.removeFromCart,
    payload: params,
  };
}

export function increaseCartItemAction(params) {
  return {
    type: cartCase.increaseCartItem,
    payload: params,
  };
}

export function decreaseCartItemItemAction(params) {
  return {
    type: cartCase.decreaseCartItem,
    payload: params,
  };
}

export function getCartListAction(params) {
  return {
    type: cartCase.getCartList,
    payload: params,
  };
}
