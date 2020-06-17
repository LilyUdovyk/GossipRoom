import { all, spawn } from "redux-saga/effects";
import { authByCredsSaga, regByCredsSaga, logoutSaga } from "./auth/sagas";
import { getUserSaga, updateUserSaga } from "./user/sagas";
import { getContactsSaga } from "./contacts/sagas";
import { getActiveChatSaga, addChatSaga, addGroupSaga, updateChatSaga } from "./chat/sagas";
import { sendMessageSaga, onMessageSaga, replyToMessageSaga, forwardMessageSaga } from "./message/sagas";
import { uploadFileSaga } from "./media/sagas";

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
    spawn(uploadFileSaga),
    spawn(replyToMessageSaga),
    spawn(forwardMessageSaga),
    spawn(addGroupSaga),
    spawn(updateUserSaga),
    spawn(updateChatSaga)
  ]);
}
