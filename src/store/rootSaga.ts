import { all, spawn } from "redux-saga/effects";
import { authByCredsSaga, regByCredsSaga } from "./auth/sagas";
import { getUserSaga } from "./user/sagas";
import { getContactsSaga } from "./contacts/sagas";
import { getActiveChatSaga } from "./chat/sagas";
import { sendMessageSaga } from "./message/sagas";

export default function* rootSaga() {
  yield all([
    spawn(authByCredsSaga),
    spawn(regByCredsSaga),
    spawn(getUserSaga),
    spawn(getContactsSaga),
    spawn(getActiveChatSaga),
    spawn(sendMessageSaga),
  ]);
}
