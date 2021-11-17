import { editUserCase, getUserCase } from "../constants";

export function getUserListAction(params) {
  return {
    type: getUserCase.req,
    payload: params,
  };
}

export function editUserAction(params) {
  return {
    type: editUserCase.req,
    payload: params,
  };
}
