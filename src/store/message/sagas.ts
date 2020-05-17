import { take, call, put, putResolve, select } from 'redux-saga/effects';
// import { push } from 'connected-react-router';

import * as actions from './actions'
import { getActiveChat } from '../chat/actions'
import { dataPost } from '../../dataPost'

export function* sendMessageSaga() {
  while (true) {
    const { payload } = yield take(actions.sendMessage.request)
    console.log("sendMessageSaga")
    try {
      console.log(payload.mediaId)
      const message = payload.mediaId
        ? yield call(sendMessageacWithAtthment, payload.activeChatId, payload.text, payload.mediaId)
        : yield call(sendMessage, payload.activeChatId, payload.text)
      console.log("sendMessageSaga -> message", message)
      yield putResolve(actions.sendMessage.success(message))
    } catch (error) {
      console.error("sendMessageSaga -> error", error)
      yield put(actions.sendMessage.failure(error.message))
    }
  }
}

const sendMessageQuery = `mutation sendMessage ($chat_id:ID, $text:String) {
  MessageUpsert(message: {
      chat: {_id: $chat_id}, 
      text: $text
  }) {
    _id
    createdAt
    text
    owner {
      _id
      login
      nick
    }
  }
}`


const sendMessage = async (chat_id: string, text: string) => {
  let messageContent = await dataPost('http://chat.fs.a-level.com.ua/graphql', 
    `Bearer ${localStorage.authToken}`,
    sendMessageQuery,
    {
      "chat_id": chat_id,
      "text": text
    }
  )
  console.log('messageContent.data.MessageUpsert', messageContent.data.MessageUpsert)
  return messageContent.data.MessageUpsert
}

const sendMessageWithAtthmentQuery = `mutation sendMessage ($chat_id:ID, $text:String, $media_id:ID) {
  MessageUpsert(message: {
      chat: {_id: $chat_id}, 
      text: $text,
    	media:[{_id: $media_id}]
  }) {
    _id
    createdAt
    text
    owner {
      _id
      login
      nick
    }
    media{
      _id
      text
      url
    }
  }
}`

const sendMessageacWithAtthment = async (chat_id: string, text: string, media_id: string) => {
  let messageContent = await dataPost('http://chat.fs.a-level.com.ua/graphql', 
    `Bearer ${localStorage.authToken}`,
    sendMessageWithAtthmentQuery,
    {
      "chat_id": chat_id,
      "text": text,
      "media_id": media_id
    }
  )
  console.log('messageContent.data.MessageUpsert', messageContent.data.MessageUpsert)
  return messageContent.data.MessageUpsert
}


export function* onMessageSaga() {
  while (true) {
    const { payload } = yield take(actions.onMessage)
    console.log("msg", payload)
    const activeChatId = yield select(state => state.chat.activeChatId)
    if (activeChatId === payload.chat._id) {
      yield put(getActiveChat.request(activeChatId))
    }
  }
}