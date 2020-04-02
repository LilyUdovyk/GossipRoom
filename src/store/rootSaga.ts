import { all, spawn } from "redux-saga/effects";
import { authByCredsSaga } from "./auth/sagas";
import { regByCredsSaga } from "./registration/sagas";

export default function* rootSaga() {
  yield all([
      spawn(authByCredsSaga),
      spawn(regByCredsSaga)
  ]);
}
