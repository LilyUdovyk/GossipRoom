import { all, spawn } from "redux-saga/effects";
import { authByCredsSaga, regByCredsSaga } from "./auth/sagas";
import { getUserSaga } from "./user/sagas";
import { getContactsSaga } from "./contacts/sagas";
import { getActiveChatSaga } from "./chat/sagas";


export default function* rootSaga() {
  yield all([
    spawn(authByCredsSaga),
    spawn(regByCredsSaga),
    spawn(getUserSaga),
    spawn(getContactsSaga),
    // spawn(setActiveChatSaga),
    spawn(getActiveChatSaga),
  ]);
}
