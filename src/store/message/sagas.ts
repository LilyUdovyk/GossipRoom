import { take, call, put, putResolve, select } from 'redux-saga/effects';

import * as actions from './actions'
import { getActiveChat } from '../chat/actions'
import { sendMessage, sendMessageacWithAtthment, replyToMessage, forwardMessage } from './utils'

export function* sendMessageSaga() {
  while (true) {
    const { payload } = yield take(actions.sendMessage.request)
    try {
      const message = payload.mediaId
        ? yield call(sendMessageacWithAtthment, payload.activeChatId, payload.text, payload.mediaId)
        : yield call(sendMessage, payload.activeChatId, payload.text)
      yield putResolve(actions.sendMessage.success(message))
    } catch (error) {
      yield put(actions.sendMessage.failure(error.message))
    }
  }
}

export function* onMessageSaga() {
  while (true) {
    const { payload } = yield take(actions.onMessage)
    const activeUserId = yield select(state => state.user.userData._id)
    if (payload.owner._id !== activeUserId) {
      playSound()
    }
    const activeChatId = yield select(state => state.chat.chatSuccessData.activeChat._id)
    if (activeChatId === payload.chat._id) {
      yield put(getActiveChat.request(activeChatId))
    }
  }
}

const playSound = () => {
  const audio = new Audio("http://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/eatedible.ogg");
  audio.play();
}

export function* replyToMessageSaga() {
  while (true) {
    const { payload } = yield take(actions.replyToMessage.request)
    try {
      const message = yield call(replyToMessage, payload.activeChatId, payload.text, payload.originalMessageId)
      yield putResolve(actions.replyToMessage.success(message))
    } catch (error) {
      yield put(actions.replyToMessage.failure(error.message))
    }
  }
}

export function* forwardMessageSaga() {
  while (true) {
    const { payload } = yield take(actions.forwardMessage.request)
    try {
      const message = yield call(forwardMessage, payload.activeChatId, payload.text, payload.originalMessageId )
      yield putResolve(actions.forwardMessage.success(message))
    } catch (error) {
      yield put(actions.forwardMessage.failure(error.message))
    }
  }
}