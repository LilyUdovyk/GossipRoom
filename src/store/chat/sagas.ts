import { take, call, put, putResolve, select } from 'redux-saga/effects';
// import { push } from 'connected-react-router';

import * as actions from './actions'
import { dataPost } from '../../dataPost'

export function* getActiveChatSaga() {
  while (true) {
    yield take(actions.getActiveChat.request)
    console.log("getActiveChatSaga")
    try {
      // const userId = yield select(state => state.user.userData.chat)
      const activeChat = yield call(getActiveChat)
      console.log("getActiveChatSaga -> activeChat", activeChat)
      yield putResolve(actions.getActiveChat.success(activeChat))
    } catch (error) {
      console.error("getActiveChatSaga -> error", error)
      yield put(actions.getActiveChat.failure(error.message))
    }
  }
}

const ActiveChatId = "5e8db02793e2915e617c6f9d"
const getActiveChat = async () => {
  const chatQuery = `[{"_id": "${ActiveChatId}"}]`
  let chatContent = await dataPost('http://chat.fs.a-level.com.ua/graphql', 
    `Bearer ${localStorage.authToken}`,
    `query getActiveChat($chatQuery: String){
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
          _id text
        }
      }
    }`,
    {
      "chatQuery": chatQuery
    }
  )
  console.log('chatContent.data.ChatFindOne', chatContent.data.ChatFindOne)
  return chatContent.data.ChatFindOne
}