import { put, takeEvery } from "redux-saga/effects";
import {
  addToOrderCase,
  getOrderListCase,
  reviewOrderCase,
} from "../constants";
import orderApi from "../../API/orderApi";

function* addToOrderSaga(action) {
  const params = action.payload;
  try {
    const result = yield orderApi.addToOrder(params);
    yield put({
      type: addToOrderCase.sucess,
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: addToOrderCase.fail,
      payload: {
        error: e.error,
      },
    });
  }
}

function* getOrderListSaga(action) {
  const params = action.payload;
  try {
    const result = yield orderApi.getOrderList(params);
    yield put({
      type: getOrderListCase.sucess,
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: getOrderListCase.fail,
      payload: {
        error: e.error,
      },
    });
  }
}

function* reviewOrderSaga(action) {
  const params = action.payload;
  try {
    const result = yield orderApi.reviewOrder(params.id, params);
    yield put({
      type: reviewOrderCase.sucess,
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: reviewOrderCase.fail,
      payload: {
        error: e.error,
      },
    });
  }
}

export default function* orderSaga() {
  yield takeEvery(addToOrderCase.req, addToOrderSaga);
  yield takeEvery(getOrderListCase.req, getOrderListSaga);
  yield takeEvery(reviewOrderCase.req, reviewOrderSaga);
}
