import { registerCase, loginCase, logoutCase } from "../constants";

export function registerAction(params) {
  return {
    type: registerCase.req,
    payload: params,
  };
}

export function loginAction(params) {
  return {
    type: loginCase.req,
    payload: params,
  };
}

export function logoutAction(params) {
  return {
    type: logoutCase.req,
    payload: params,
  };
}
