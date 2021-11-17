import { bannerCase } from "../constants";

export function getBannerListAction(params) {
  return {
    type: bannerCase.req,
    payload: params,
  };
}
