import { put, takeEvery } from "redux-saga/effects";
import { editUserCase, getUserCase } from "../constants";
import userApi from "../../API/userApi";

function* getUserListSaga(action) {
  const params = action.payload;
  try {
    const result = yield userApi.getUserList(params);
    yield put({
      type: getUserCase.sucess,
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: getUserCase.fail,
      payload: {
        error: e.error,
      },
    });
  }
}

function* editUserSaga(action) {
  const params = action.payload;
  try {
    const result = yield userApi.editUser(
      { id: params.userId },
      { role: params.role }
    );
    yield put({
      type: editUserCase.sucess,
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: editUserCase.fail,
      payload: {
        error: e.error,
      },
    });
  }
}

export default function* userSaga() {
  yield takeEvery(getUserCase.req, getUserListSaga);
  yield takeEvery(editUserCase.req, editUserSaga);
}
