import { take, call, put, putResolve, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import * as actions from './actions'
import { getActiveChat, addNewChat, addNewGroup, updateChat } from './api'
import { ChatData } from '../chat/types';

export function* getActiveChatSaga() {
  while (true) {
    const { payload } = yield take(actions.getActiveChat.request)
    try {
      const activeUserId = yield select(state => state.auth.authData.id)
      const activeChat = yield call(getActiveChat, payload)
      const activeChatId = activeChat._id
      const activeChatName = yield call(getNameOfChat, activeChat, activeUserId)
      yield putResolve(actions.getActiveChat.success({ activeChat, activeChatId, activeChatName }))
    } catch (error) {
      yield put(actions.getActiveChat.failure(error.message))
    }
  }
}

const getNameOfChat = (activeChat: ChatData, activeUserId: string) => {
  if (activeChat.members.length === 1) {
    return "You"
  } else if (activeChat.title) {
    return activeChat.title
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
      const activeChatId = newChat._id
      yield putResolve(actions.addChat.success({ newChat, activeChatId }))
      const activeChat = yield call(getActiveChat, activeChatId)
      const activeChatName = yield call(getNameOfChat, activeChat, activeUserId)
      yield putResolve(actions.getActiveChat.success({ activeChat, activeChatId, activeChatName }))
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
      const activeChatId = newChat._id
      yield putResolve(actions.addGroup.success({ newChat, activeChatId }))
      const activeChat = yield call(getActiveChat, activeChatId)
      const activeUserId = yield select(state => state.auth.authData.id)
      const activeChatName = yield call(getNameOfChat, activeChat, activeUserId)
      yield putResolve(actions.getActiveChat.success({ activeChat, activeChatId, activeChatName }))
      yield put(push('/profile'))
    } catch (error) {
      yield put(actions.addGroup.failure(error.message))
    }
  }
}

export function* updateChatSaga() {
  while (true) {
    const { payload } = yield take(actions.updateChat.request)
    console.log('saga', payload)
    try {
      const chatData = yield call(updateChat, payload.chat_id, payload.title)
      console.log("saga chatData ", chatData )
      yield putResolve(actions.updateChat.success(chatData))
    } catch (error) {
      yield put(actions.updateChat.failure(error.message))
    }
  }
}