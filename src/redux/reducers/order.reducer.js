import {
  addToOrderCase,
  getOrderListCase,
  reviewOrderCase,
} from "../constants";

const initialState = {
  orderList: {
    data: [],
    load: false,
    error: "",
  },
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case addToOrderCase.req: {
      return {
        ...state,
        orderList: {
          ...state.orderList,
          load: true,
        },
      };
    }
    case addToOrderCase.sucess: {
      const { orderItem } = action.payload;
      return {
        ...state,
        orderList: {
          ...state.orderList,
          data: [...state.orderList, orderItem],
          load: false,
        },
      };
    }
    case addToOrderCase.fail: {
      const { error } = action.payload;
      return {
        ...state,
        orderList: {
          ...state.orderList,
          error,
          load: false,
        },
      };
    }
    case getOrderListCase.req: {
      return {
        ...state,
        orderList: {
          ...state.orderList,
          load: true,
        },
      };
    }
    case getOrderListCase.sucess: {
      const { data } = action.payload;
      return {
        ...state,
        orderList: {
          ...state.orderList,
          data,
          load: false,
        },
      };
    }
    case getOrderListCase.fail: {
      const { error } = action.payload;
      return {
        ...state,
        orderList: {
          ...state.orderList,
          error,
          load: false,
        },
      };
    }
    case reviewOrderCase.req: {
      return {
        ...state,
        orderList: {
          ...state.orderList,
          load: true,
        },
      };
    }
    case reviewOrderCase.sucess: {
      const { data } = action.payload;
      const newOrderList = state.orderList.data;
      const indexOrder = newOrderList.findIndex((item) => item.id === data.id);
      newOrderList.splice(indexOrder, 1, data);
      return {
        ...state,
        orderList: {
          ...state.orderList,
          data: newOrderList,
          load: false,
        },
      };
    }
    case reviewOrderCase.fail: {
      const { error } = action.payload;
      return {
        ...state,
        orderList: {
          ...state.orderList,
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
