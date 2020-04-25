import { take, call, put, putResolve, select } from 'redux-saga/effects';
// import { push } from 'connected-react-router';

import * as actions from './actions'
import { dataPost } from '../../dataPost'
import { ChatData } from '../user/types';

export function* getActiveChatSaga() {
  while (true) {
    const { payload } = yield take(actions.getActiveChat.request)
    console.log("getActiveChatSaga")
    try {
      const activeUserId = yield select(state => state.auth.authData.id)
      const activeChat = yield call(getActiveChat, payload)
      console.log("getActiveChatSaga -> activeChat", activeChat)
      const activeChatId = activeChat._id
      const activeChatName = yield call(getNameOfChat, activeChat, activeUserId)
      yield putResolve(actions.getActiveChat.success({ activeChat, activeChatId, activeChatName }))
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

const getNameOfChat = (activeChat: ChatData, activeUserId: string) => {
  if (activeChat.title) {
    return activeChat.title
  } else {
    let member = activeChat.members.find(member => {
      return member._id !== activeUserId
    })
    console.log("member", member)
    return member && (member.nick ? member.nick : member.login)
  }
}

export function* addChatSaga() {
  while (true) {
    const { payload } = yield take(actions.addChat.request)
    console.log("addChatSaga")
    try {
      const activeUserId = yield select(state => state.auth.authData.id)
      const newChat = yield call(addNewChat, activeUserId,  payload)
      console.log("addChatSaga -> newChat", newChat)
      const activeChatId = newChat._id
      yield putResolve(actions.addChat.success({ newChat, activeChatId }))
      const activeChat = yield call(getActiveChat, activeChatId)
      const activeChatName = yield call(getNameOfChat, activeChat, activeUserId)
      yield putResolve(actions.getActiveChat.success({ activeChat, activeChatId, activeChatName }))
    } catch (error) {
      console.error("addChatSaga -> error", error)
      yield put(actions.addChat.failure(error.message))
    }
  }
}

const addNewChatQuery = `mutation addChat ($firstMember_id:ID, $secondMember_id:ID)  {
  ChatUpsert(chat: {   
		members: [
      {_id: $firstMember_id}, {_id: $secondMember_id}
    ]}) {
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

const addNewChat = async (firstMember_id: string, secondMember_id: string) => {
  let newChatContent = await dataPost('http://chat.fs.a-level.com.ua/graphql', 
    `Bearer ${localStorage.authToken}`,
    addNewChatQuery,
    {
      "firstMember_id": firstMember_id,
      "secondMember_id": secondMember_id
    }
  )
  console.log('chatContent.data.ChatUpsert', newChatContent.data.ChatUpsert)
  return newChatContent.data.ChatUpsert
}