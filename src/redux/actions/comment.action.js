import { getCommentCase, addToCommentCase } from "../constants";

export function getCommentAction(params) {
  return {
    type: getCommentCase.req,
    payload: params,
  };
}

export function addToCommentAction(params) {
  return {
    type: addToCommentCase.req,
    payload: params,
  };
}
