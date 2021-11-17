import { editUserCase, getUserCase } from "../constants";

const initialState = {
  userList: {
    data: [],
    load: false,
    error: "",
  },
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case getUserCase.req: {
      return {
        ...state,
        userList: {
          data: [],
          load: true,
        },
      };
    }
    case getUserCase.sucess: {
      const { data } = action.payload;
      return {
        ...state,
        userList: {
          data,
          load: false,
        },
      };
    }
    case getUserCase.fail: {
      const { error } = action.payload;
      return {
        ...state,
        userList: {
          error,
          load: false,
        },
      };
    }
    case editUserCase.req: {
      return {
        ...state,
        userList: {
          ...state.userList,
          load: true,
        },
      };
    }
    case editUserCase.sucess: {
      const { data } = action.payload;
      const newUserList = state.userList.data;
      const userIndex = newUserList.findIndex((item) => item.id === data.id);
      newUserList.splice(userIndex, 1, data);
      return {
        ...state,
        userList: {
          data: newUserList,
          load: false,
        },
      };
    }
    case editUserCase.fail: {
      const { error } = action.payload;
      return {
        ...state,
        userList: {
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
