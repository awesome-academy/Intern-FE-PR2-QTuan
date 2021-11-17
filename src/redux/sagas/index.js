import { fork } from "redux-saga/effects";

import categorySaga from "./category.saga";
import bannerSaga from "./banner.saga";
import productSaga from "./product.saga";
import authSaga from "./auth.saga";
import orderSaga from "./order.saga";
import commentSaga from "./comment.saga";
import userSaga from "./user.saga";

export default function* mySaga() {
  yield fork(categorySaga);
  yield fork(bannerSaga);
  yield fork(productSaga);
  yield fork(authSaga);
  yield fork(orderSaga);
  yield fork(commentSaga);
  yield fork(userSaga);
}
