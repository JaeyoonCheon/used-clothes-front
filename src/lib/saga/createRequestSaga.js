import { call, put } from "redux-saga/effects";
import {
  start as startLoading,
  finish as finishLoading,
} from "../../slices/loadingSlice";

export default function createRequestSaga(actionType, request) {
  const SUCCESS = `${actionType}_success`;
  const FAILURE = `${actionType}_failure`;

  return function* (action) {
    yield put(startLoading(actionType));

    try {
      const response = yield call(request, action.payload);
      yield put({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
    }

    yield put(finishLoading(actionType));
  };
}
