import { take, call, put, putResolve, select } from 'redux-saga/effects';
// import { push } from 'connected-react-router';

import * as actions from './actions'
import { dataPost } from '../../dataPost'

// export function* setActiveChatSaga() {
//   while (true) {
//     yield take(actions.setActiveChat)
//     console.log("setActiveChatSaga")
//   }
// }

export function* getActiveChatSaga() {
  while (true) {
    const { payload } = yield take(actions.getActiveChat.request)
    console.log("getActiveChatSaga")
    try {
      const activeChat = yield call(getActiveChat, payload)
      console.log("getActiveChatSaga -> activeChat", activeChat)
      const activeChatId = activeChat._id
      yield putResolve(actions.getActiveChat.success({ activeChat, activeChatId }))
    } catch (error) {
      console.error("getActiveChatSaga -> error", error)
      yield put(actions.getActiveChat.failure(error.message))
    }
  }
}

const getActiveChatQuery = `query getActiveChat($chatQuery: String){
  ChatFindOne(query: $chatQuery){
    _id title createdAt
    owner {
      _id login nick
      avatar{
        _id, url
      }
    }
        avatar{
      _id, url
    }
    members{
      _id login nick
      avatar{
        _id, url
      }
    }
    messages{
      _id text createdAt 
      owner{
        _id
      }
    }
  }
}`

const getActiveChat = async (chatId: string) => {
  const chatQuery = `[{"_id": "${chatId}"}]`
  let chatContent = await dataPost('http://chat.fs.a-level.com.ua/graphql', 
    `Bearer ${localStorage.authToken}`,
    getActiveChatQuery,
    {
      "chatQuery": chatQuery
    }
  )
  console.log('chatContent.data.ChatFindOne', chatContent.data.ChatFindOne)
  return chatContent.data.ChatFindOne
}