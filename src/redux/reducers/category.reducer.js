import { categoryCase } from "../constants";

const initialState = {
  categoryList: {
    data: [],
    load: false,
    error: "",
  },
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case categoryCase.req: {
      return {
        ...state,
        categoryList: {
          data: [],
          load: true,
        },
      };
    }
    case categoryCase.sucess: {
      const { data } = action.payload;
      return {
        ...state,
        categoryList: {
          data,
          load: false,
        },
      };
    }
    case categoryCase.fail: {
      const { error } = action.payload;
      return {
        ...state,
        categoryList: {
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
