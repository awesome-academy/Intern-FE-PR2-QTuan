import { put, takeEvery } from "redux-saga/effects";
import { getCommentCase, addToCommentCase } from "../constants";
import commentApi from "../../API/commentApi";

function* getCommentSaga(action) {
  const params = action.payload;
  try {
    const result = yield commentApi.getComment({ productId: params });
    yield put({
      type: getCommentCase.sucess,
      payload: {
        data: result.data,
        total: result.total,
      },
    });
  } catch (e) {
    yield put({
      type: getCommentCase.fail,
      payload: {
        error: e.error,
      },
    });
  }
}

function* addToCommentSaga(action) {
  const params = action.payload;
  try {
    const result = yield commentApi.addToComment(params);
    yield put({
      type: addToCommentCase.sucess,
      payload: {
        data: result,
      },
    });
  } catch (e) {
    yield put({
      type: addToCommentCase.fail,
      payload: {
        error: e.error,
      },
    });
  }
}

export default function* commentSaga() {
  yield takeEvery(getCommentCase.req, getCommentSaga);
  yield takeEvery(addToCommentCase.req, addToCommentSaga);
}
