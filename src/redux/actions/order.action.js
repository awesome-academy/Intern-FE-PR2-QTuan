import {
  addToOrderCase,
  getOrderListCase,
  reviewOrderCase,
} from "../constants";

export function addToOrderAction(params) {
  return {
    type: addToOrderCase.req,
    payload: params,
  };
}

export function getOrderListAction(params) {
  return {
    type: getOrderListCase.req,
    payload: params,
  };
}

export function reviewOrderAction(params) {
  return {
    type: reviewOrderCase.req,
    payload: params,
  };
}
