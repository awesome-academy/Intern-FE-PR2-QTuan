import {
  productCase,
  productItemCase,
  deleteItemCase,
  setProductSelect,
  editItemCase,
  addProductCase,
} from "../constants";

export function getProductListAction(params) {
  return {
    type: productCase.req,
    payload: params,
  };
}

export function getProductItem(params) {
  return {
    type: productItemCase.req,
    payload: params,
  };
}

export function deleteProuctItemAction(params) {
  return {
    type: deleteItemCase.req,
    payload: params,
  };
}

export function setProductSelectAction(params) {
  return {
    type: setProductSelect,
    payload: params,
  };
}

export function editProductItemAction(params) {
  return {
    type: editItemCase.req,
    payload: params,
  };
}

export function addProductAction(params) {
  return {
    type: addProductCase.req,
    payload: params,
  };
}
