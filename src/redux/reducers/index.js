import { combineReducers } from "redux";
import categoryReducer from "./category.reducer";
import bannerReducer from "./banner.reducer";
import productReducer from "./product.reducer";
import authReducer from "./auth.reducer";
import cartReducer from "./cart.reducer";
import orderReducer from "./order.reducer";
import commentReducer from "./comment.reducer";
import userReducer from "./user.reducer";

export default combineReducers({
  categoryReducer,
  bannerReducer,
  productReducer,
  authReducer,
  cartReducer,
  orderReducer,
  commentReducer,
  userReducer,
});
