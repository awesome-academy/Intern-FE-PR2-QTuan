import {
  loginCase,
  registerCase,
  logoutCase,
  updateUserCase,
} from "../constants";
import { notification } from "antd";

const initialState = {
  userInfo: {
    data: {},
    load: false,
    error: "",
  },
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case registerCase.req: {
      return {
        ...state,
        userInfo: {
          load: true,
        },
      };
    }
    case registerCase.sucess: {
      const { data } = action.payload;
      return {
        ...state,
        userInfo: {
          data,
          load: false,
        },
      };
    }
    case registerCase.fail: {
      const { error } = action.payload;
      return {
        ...state,
        userInfo: {
          error,
          load: false,
        },
      };
    }
    case loginCase.req: {
      return {
        ...state,
        userInfo: {
          load: true,
        },
      };
    }
    case loginCase.sucess: {
      const { user, accessToken } = action.payload.data;
      localStorage.setItem("accessToken", JSON.stringify(accessToken));
      localStorage.setItem("userInfo", JSON.stringify(user));
      return {
        ...state,
        userInfo: {
          data: user,
          load: false,
        },
      };
    }
    case loginCase.fail: {
      const { error } = action.payload;
      return {
        ...state,
        userInfo: {
          error,
          load: false,
        },
      };
    }
    case logoutCase.req: {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("cartList");
      notification.success({
        message: "Loggout in successfully!",
      });
      return {
        ...state,
        userInfo: {
          data: {},
          load: false,
        },
      };
    }
    case updateUserCase.sucess: {
      const { data } = action.payload.data;
      delete data.password;
      localStorage.setItem("userInfo", JSON.stringify(data));
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          data,
          load: false,
        },
      };
    }
    case updateUserCase.fail: {
      const { error } = action.payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: false,
          error,
        },
      };
    }
    default: {
      return state;
    }
  }
}
