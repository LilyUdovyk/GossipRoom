import { take, call, put, putResolve, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import * as actions from './actions'
import { getActiveChat, addNewChat, addNewGroup, updateChat } from './utils'
import { ChatData } from '../chat/types';

export function* getActiveChatSaga() {
  while (true) {
    const { payload } = yield take(actions.getActiveChat.request)
    try {
      const activeUserId = yield select(state => state.auth.authData.id)
      const activeChat = yield call(getActiveChat, payload)
      const activeChatName = yield call(getNameOfChat, activeChat, activeUserId)
      yield putResolve(actions.getActiveChat.success({ activeChat, activeChatName }))
    } catch (error) {
      yield put(actions.getActiveChat.failure(error.message))
    }
  }
}

const getNameOfChat = (activeChat: ChatData, activeUserId: string) => {
  if (activeChat.title) {
    return activeChat.title
  } else if (activeChat.members.length === 1) {
    return "You"
  } else if (activeChat.members.length > 2) {
    return "Group"
  } else {
    let member = activeChat.members.find(member => {
      return member._id !== activeUserId
    })
    return member && (member.nick || member.login)
  }
}

export function* addChatSaga() {
  while (true) {
    const { payload } = yield take(actions.addChat.request)
    try {
      const activeUserId = yield select(state => state.auth.authData.id)
      const newChat = yield call(addNewChat, activeUserId,  payload)
      const activeChatName = yield call(getNameOfChat, newChat, activeUserId)
      yield putResolve(actions.addChat.success({ activeChat: newChat, activeChatName }))
    } catch (error) {
      yield put(actions.addChat.failure(error.message))
    }
  }
}

export function* addGroupSaga() {
  while (true) {
    const { payload } = yield take(actions.addGroup.request)
    try {
      const newChat = yield call(addNewGroup, payload.chatTitle,  payload.members)
      const activeUserId = yield select(state => state.auth.authData.id)
      const activeChatName = yield call(getNameOfChat, newChat, activeUserId)
      yield putResolve(actions.addGroup.success({ activeChat: newChat, activeChatName }))
      yield put(push('/profile'))
    } catch (error) {
      yield put(actions.addGroup.failure(error.message))
    }
  }
}

export function* updateChatSaga() {
  while (true) {
    const { payload } = yield take(actions.updateChat.request)
    try {
      const chatData = yield call(updateChat, payload.chatId, payload.title)
      const activeUserId = yield select(state => state.auth.authData.id)
      const activeChatName = yield call(getNameOfChat, chatData, activeUserId)
      yield putResolve(actions.updateChat.success({ activeChat: chatData, activeChatName }))
      yield put(push('/profile'))
    } catch (error) {
      yield put(actions.updateChat.failure(error.message))
    }
  }
}