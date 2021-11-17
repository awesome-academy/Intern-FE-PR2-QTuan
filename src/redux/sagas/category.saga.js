import { put, takeEvery } from "redux-saga/effects";
import { categoryCase } from "../constants";
import categoryApi from "../../API/categoryApi";

function* getCategoryListSaga(action) {
  const params = action.payload;
  try {
    const result = yield categoryApi.getCategories(params);
    yield put({
      type: categoryCase.sucess,
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: categoryCase.fail,
      payload: {
        error: e.error,
      },
    });
  }
}

export default function* categorySaga() {
  yield takeEvery(categoryCase.req, getCategoryListSaga);
}
