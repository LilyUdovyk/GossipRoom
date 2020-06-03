import { take, call, put, putResolve, select } from 'redux-saga/effects';

import * as actions from './actions'
import { getActiveChat } from '../chat/actions'
import { dataPost } from '../../dataPost'

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

const messageQuery = 
`{
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
    originalFileName
    type
  }
  replies {
    _id
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
      originalFileName
      type
    }
  }
  replyTo {
    _id
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
      originalFileName
      type
    }
  }
  forwarded {
    _id
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
      originalFileName
      type
    }
  }
  forwardWith {
    _id
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
      originalFileName
      type
    }
  }
}`

const sendMessageQuery = `mutation sendMessage ($chat_id:ID, $text:String) {
  MessageUpsert(message: {
      chat: {_id: $chat_id}, 
      text: $text
  }) ${messageQuery}
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
  return messageContent.data.MessageUpsert
}

const sendMessageWithAtthmentQuery = `mutation sendMessage ($chat_id:ID, $text:String, $media_id:ID) {
  MessageUpsert(message: {
      chat: {_id: $chat_id}, 
      text: $text,
    	media:[{_id: $media_id}]
  }) ${messageQuery}
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
  return messageContent.data.MessageUpsert
}


export function* onMessageSaga() {
  while (true) {
    const { payload } = yield take(actions.onMessage)
    const activeUserId = yield select(state => state.user.userData._id)
    if (payload.owner._id !== activeUserId) {
      playSound()
    }
    const activeChatId = yield select(state => state.chat.activeChatId)
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

const replyToMessageQuery = `mutation replyToMessage ($message_id:ID, $chat_id:ID, $text:String) {
  MessageUpsert(message: {
    chat: {_id: $chat_id},
    text: $text
    replyTo: {
      _id: $message_id,
    }
  }) ${messageQuery}
}`


const replyToMessage = async (chat_id: string, text: string, originalMessageId: string) => {
  let messageContent = await dataPost('http://chat.fs.a-level.com.ua/graphql', 
    `Bearer ${localStorage.authToken}`,
    replyToMessageQuery,
    {
      "chat_id": chat_id,
      "text": text,
      "message_id": originalMessageId
    }
  )
  return messageContent.data.MessageUpsert
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

const forwardMessageQuery = `mutation forwardedMessage ($chat_id:ID, $message_id:ID, $text:String) {
  MessageUpsert(message: {
    chat: {_id: $chat_id},
    text: $text,
    forwarded: {
    	_id: $message_id,
    }
  }) ${messageQuery}
}`


const forwardMessage = async (chat_id: string, text: string, originalMessageId: string) => {
  let messageContent = await dataPost('http://chat.fs.a-level.com.ua/graphql', 
    `Bearer ${localStorage.authToken}`,
    forwardMessageQuery,
    {
      "chat_id": chat_id,
      "text": text,
      "message_id": originalMessageId
    }
  )
  return messageContent.data.MessageUpsert
}