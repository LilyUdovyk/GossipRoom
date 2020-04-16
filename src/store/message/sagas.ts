import { take, call, put, putResolve, select } from 'redux-saga/effects';
// import { push } from 'connected-react-router';

import * as actions from './actions'
import { dataPost } from '../../dataPost'

export function* sendMessageSaga() {
  while (true) {
    const { payload } = yield take(actions.sendMessage.request)
    console.log("sendMessageSaga")
    try {
      const message = yield call(sendMessage, payload.activeChatId, payload.text)
      console.log("sendMessageSaga -> message", message)
      yield putResolve(actions.sendMessage.success(message))
    } catch (error) {
      console.error("sendMessageSaga -> error", error)
      yield put(actions.sendMessage.failure(error.message))
    }
  }
}

const sendMessageQuery = `mutation sendMessage ($chat_id:ID, $text:String) {
  ChatUpsert(chat: { 
    messages: {
      chat: {_id: $chat_id}, 
      text: $text
    }
  }) {
    _id
    members {
      _id
      login
      nick
    }
    messages {
      _id
      createdAt
      text
      owner {
        _id
        login
        nick
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
  console.log("chat_id", chat_id, "text", text)
  console.log('messageContent.data.ChatUpsert', messageContent.data.ChatUpsert)
  return messageContent.data.ChatUpsert
}