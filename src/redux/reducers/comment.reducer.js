import { getCommentCase, addToCommentCase } from "../constants";

const initialState = {
  commentList: {
    data: [],
    load: false,
    error: "",
  },
};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case addToCommentCase.req: {
      return {
        ...state,
        commentList: {
          ...state.commentList,
          load: true,
        },
      };
    }
    case addToCommentCase.sucess: {
      const { data } = action.payload;
      return {
        ...state,
        commentList: {
          ...state.commentList,
          data: [data, ...state.commentList.data],
          load: false,
        },
      };
    }
    case addToCommentCase.fail: {
      return {
        ...state,
        commentList: {
          ...state.commentList.data,
          load: false,
        },
      };
    }
    case getCommentCase.req: {
      return {
        ...state,
        commentList: {
          ...state.commentList,
          load: true,
        },
      };
    }
    case getCommentCase.sucess: {
      const { data } = action.payload;
      return {
        ...state,
        commentList: {
          ...state.commentList,
          data: data,
          load: false,
        },
      };
    }
    case getCommentCase.fail: {
      const { error } = action.payload;
      return {
        ...state,
        commentList: {
          ...state.commentList,
          load: false,
          error: error,
        },
      };
    }
    default: {
      return state;
    }
  }
}
