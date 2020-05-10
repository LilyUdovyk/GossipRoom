import { all, spawn } from "redux-saga/effects";
import { authByCredsSaga, regByCredsSaga, logoutSaga } from "./auth/sagas";
import { getUserSaga, updateAvatarSaga } from "./user/sagas";
import { getContactsSaga } from "./contacts/sagas";
import { getActiveChatSaga } from "./chat/sagas";
import { addChatSaga } from "./chat/sagas";
import { sendMessageSaga, onMessageSaga } from "./message/sagas";
import { uploadAvatarSaga } from "./media/sagas";

export default function* rootSaga() {
  yield all([
    spawn(authByCredsSaga),
    spawn(regByCredsSaga),
    spawn(getUserSaga),
    spawn(getContactsSaga),
    spawn(getActiveChatSaga),
    spawn(sendMessageSaga),
    spawn(addChatSaga),
    spawn(logoutSaga),
    spawn(onMessageSaga),
    spawn(uploadAvatarSaga),
    spawn(updateAvatarSaga),
  ]);
}
