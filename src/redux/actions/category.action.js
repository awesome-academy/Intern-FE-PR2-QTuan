import { categoryCase } from "../constants";

export function getCategoryListAction(params) {
  return {
    type: categoryCase.req,
    payload: params,
  }
}