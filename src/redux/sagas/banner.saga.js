import { put, takeEvery } from "redux-saga/effects";
import { bannerCase } from "../constants";
import bannerApi from "../../API/bannerApi";

function* getBannerListSaga(action) {
  const params = action.payload;
  try {
    const result = yield bannerApi.getBannerList(params);
    yield put({
      type: bannerCase.sucess,
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: bannerCase.fail,
      payload: {
        error: e.error,
      },
    });
  }
}

export default function* bannerSaga() {
  yield takeEvery(bannerCase.req, getBannerListSaga);
}
