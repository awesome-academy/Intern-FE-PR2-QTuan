import { cartCase, addToOrderCase } from "../constants";

const initialState = {
  cartList: {
    data: null,
    totalCartList: 0,
    load: false,
    error: "",
  },
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case cartCase.addToCart: {
      const product = action.payload;

      let cartList = JSON.parse(localStorage.getItem("cartList")) || [];

      if (!product.size.id && !product.color.id) {
        //hasn't option
        const indexProduct = cartList.findIndex(
          (cartItem) => cartItem.id === product.id
        );
        if (indexProduct !== -1) {
          cartList.splice(indexProduct, 1, {
            ...product,
            amount: cartList[indexProduct].amount + product.amount,
          });
        } else {
          cartList = [...cartList, product];
        }
      } else if (!product.color.id) {
        //hasn't size
        const existSizeIndex = cartList.findIndex(
          (item) => item.size.id === product.size.id
        );
        if (existSizeIndex !== -1) {
          cartList.splice(existSizeIndex, 1, {
            ...product,
            amount: cartList[existSizeIndex].amount + product.amount,
          });
        } else {
          cartList = [...cartList, product];
        }
      } else if (!product.size.id) {
        //hasn't color
        const existColorIndex = cartList.findIndex(
          (item) => item.color.id === product.color.id
        );
        if (existColorIndex !== -1) {
          cartList.splice(existColorIndex, 1, {
            ...product,
            amount: cartList[existColorIndex].amount + product.amount,
          });
        } else {
          cartList = [...cartList, product];
        }
      } else {
        //have 2 options
        const existOptionIndex = cartList.findIndex(
          (item) =>
            item.color.id === product.color.id &&
            item.size.id === product.size.id
        );
        if (existOptionIndex !== -1) {
          cartList.splice(existOptionIndex, 1, {
            ...product,
            amount: cartList[existOptionIndex].amount + product.amount,
          });
        } else {
          cartList = [...cartList, product];
        }
      }

      localStorage.setItem("cartList", JSON.stringify(cartList));

      return {
        ...state,
        cartList: {
          data: cartList,
          totalCartList: cartList.length,
          load: true,
        },
      };
    }

    case cartCase.removeFromCart: {
      const indexCart = action.payload;
      let cartList = JSON.parse(localStorage.getItem("cartList")) || [];
      cartList.splice(indexCart, 1);
      localStorage.setItem("cartList", JSON.stringify(cartList));
      return {
        ...state,
        cartList: {
          data: cartList,
          totalCartList: cartList.length,
          load: true,
        },
      };
    }

    case cartCase.increaseCartItem: {
      const { index, amount } = action.payload;
      let cartList = JSON.parse(localStorage.getItem("cartList")) || [];
      cartList.splice(index, 1, {
        ...cartList[index],
        amount: amount,
      });
      return {
        ...state,
        cartList: {
          data: cartList,
          totalCartList: cartList.length,
          load: true,
        },
      };
    }
    case cartCase.decreaseCartItem: {
      const { index, amount } = action.payload;
      let cartList = JSON.parse(localStorage.getItem("cartList")) || [];
      cartList.splice(index, 1, {
        ...cartList[index],
        amount: amount,
      });
      return {
        ...state,
        cartList: {
          data: cartList,
          totalCartList: cartList.length,
          load: true,
        },
      };
    }
    case addToOrderCase.sucess: {
      localStorage.removeItem("cartList");
      return {
        ...state,
        cartList: {
          ...state.cartList,
          data: [],
          load: false,
          totalCartList: 0,
        },
      };
    }
    default: {
      return state;
    }
  }
}
