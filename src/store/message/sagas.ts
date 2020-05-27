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
      }
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
  console.log("tik")
  const audio = new Audio("http://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/eatedible.ogg");
  audio.play();
}

export function* replyToMessageSaga() {
  while (true) {
    const { payload } = yield take(actions.replyToMessage.request)
    console.log("replyToMessageSaga")
    try {
      const message = yield call(replyToMessage, payload.activeChatId, payload.text, payload.originalMessageId)
      console.log("replyToMessageSaga -> message", message)
      yield putResolve(actions.replyToMessage.success(message))
    } catch (error) {
      console.error("replyToMessageSaga -> error", error)
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
  }
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
  console.log('messageContent.data.MessageUpsert', messageContent.data.MessageUpsert)
  return messageContent.data.MessageUpsert
}

export function* forwardMessageSaga() {
  while (true) {
    const { payload } = yield take(actions.forwardMessage.request)
    console.log("forwardMessageSaga")
    try {
      const originalMessage = yield select(state => state.message.originalMessage)
      const message = yield call(forwardMessage, payload, originalMessage._id)
      console.log("forwardMessageSaga -> message", message)
      yield putResolve(actions.forwardMessage.success(message))
    } catch (error) {
      console.error("forwardMessageSaga -> error", error)
      yield put(actions.forwardMessage.failure(error.message))
    }
  }
}

const forwardMessageQuery = `mutation forwardedMessage ($message_id:ID, $chat_id:ID) {
  MessageUpsert(message: {
    chat: {_id: $chat_id},
    forwarded: {
    	_id: $message_id,
    }
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
  }
}`


const forwardMessage = async (chat_id: string, originalMessageId: string) => {
  let messageContent = await dataPost('http://chat.fs.a-level.com.ua/graphql', 
    `Bearer ${localStorage.authToken}`,
    forwardMessageQuery,
    {
      "chat_id": chat_id,
      "message_id": originalMessageId
    }
  )
  console.log('messageContent.data.MessageUpsert', messageContent.data.MessageUpsert)
  return messageContent.data.MessageUpsert
}