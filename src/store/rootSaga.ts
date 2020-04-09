import { all, spawn } from "redux-saga/effects";
import { authByCredsSaga } from "./auth/sagas";
// import { regByCredsSaga } from "./registration/sagas";
import { getUserSaga } from "./user/sagas";

export default function* rootSaga() {
  yield all([
      spawn(authByCredsSaga),
      // spawn(regByCredsSaga),
      spawn(getUserSaga)
  ]);
}
