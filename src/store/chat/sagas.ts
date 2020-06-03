import { take, call, put, putResolve, select } from 'redux-saga/effects';

import * as actions from './actions'
import { dataPost } from '../../dataPost'
import { ChatData } from '../user/types';

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

const chatQuery = 
`{
  _id
  title
  createdAt
  owner {
    _id
    login
    nick
    avatar {
      _id
      url
    }
  }
  avatar {
    _id
    url
  }
  members {
    _id
    login
    nick
    avatar {
      _id
      url
    }
  }
  messages{
    _id
    text
    createdAt 
    owner{
      _id
      login
      nick
    }
    media{
      _id
      url
      type
      originalFileName
      text
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
        type
        originalFileName
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
        type
        originalFileName
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
        type
        originalFileName
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
        type
        originalFileName
      }
    }
  }
}`

const getActiveChatQuery = `query getActiveChat($activeChatQuery: String){
  ChatFindOne(query: $activeChatQuery)
  ${chatQuery}
}`

const getActiveChat = async (chatId: string) => {
  const activeChatQuery = `[{"_id": "${chatId}"}]`
  let chatContent = await dataPost('http://chat.fs.a-level.com.ua/graphql', 
    `Bearer ${localStorage.authToken}`,
    getActiveChatQuery,
    {
      "activeChatQuery": activeChatQuery
    }
  )
  return chatContent.data.ChatFindOne
}

const getNameOfChat = (activeChat: ChatData, activeUserId: string) => {
  if (activeChat.title) {
    return activeChat.title
  } else {
    let member = activeChat.members.find(member => {
      return member._id !== activeUserId
    })
    return member && (member.nick ? member.nick : member.login)
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

const addNewChatQuery = `mutation addChat ($firstMember_id:ID, $secondMember_id:ID) {
  ChatUpsert(chat: {   
		members: [
      {_id: $firstMember_id}, {_id: $secondMember_id}
    ]}) ${chatQuery}
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
  return newChatContent.data.ChatUpsert
}