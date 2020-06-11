import { take, call, put, putResolve, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import * as actions from './actions'
import { dataPost } from '../../dataPost'
import { ChatData } from '../chat/types';
import { UserData } from '../user/types';

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
  if (activeChat.members.length === 1) {
    return "You"
  } else if (activeChat.title) {
    let membersNames = activeChat.members.map(member => member.nick || member.login)
    let members = membersNames.join(', ')
    return `${activeChat.title} with ${members}`
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

export function* addGroupSaga() {
  while (true) {
    const { payload } = yield take(actions.addGroup.request)
    try {
      console.log("addGroupSaga", payload)
      const newChat = yield call(addNewGroup, payload.chatTitle,  payload.members)
      console.log("newChat", newChat)
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

const addNewGroupQuery = `mutation addNewGroup ($chat_title:String, $members:[UserInput]) {
  ChatUpsert(chat: {
    title: $chat_title,
		members: $members
  }) ${chatQuery}
}`

const addNewGroup = async (chatTitle: string, members: UserData[]) => {
  const membersQuery = members.map(member => {
    return {"_id": member._id}
  })
  console.log("membersQuery", membersQuery)
  let newGroupContent = await dataPost('http://chat.fs.a-level.com.ua/graphql', 
    `Bearer ${localStorage.authToken}`,
    addNewGroupQuery,
    {
    	"chat_title": chatTitle,
  		"members": membersQuery
    }
  )
  console.log("newGroupContent.data.ChatUpsert", newGroupContent.data.ChatUpsert)
  return newGroupContent.data.ChatUpsert
}