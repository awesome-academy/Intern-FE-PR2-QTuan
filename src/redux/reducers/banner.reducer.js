import { bannerCase } from "../constants";

const initialState = {
  bannerList: {
    data: [],
    load: false,
    error: "",
  },
};

export default function bannerReducer(state = initialState, action) {
  switch (action.type) {
    case bannerCase.req: {
      return {
        ...state,
        bannerList: {
          load: true,
        },
      };
    }
    case bannerCase.sucess: {
      const { data } = action.payload;
      return {
        ...state,
        bannerList: {
          data,
          load: false,
        },
      };
    }
    case bannerCase.fail: {
      const { error } = action.payload;
      return {
        ...state,
        bannerList: {
          error,
          load: false,
        },
      };
    }
    default: {
      return state;
    }
  }
}
