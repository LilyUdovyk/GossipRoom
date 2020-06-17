import { dataPost } from '../../services/api'
import { UserData } from '../user/types';

export const chatQuery = 
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

export const getActiveChat = async (chatId: string) => {
  const activeChatQuery = `[{"_id": "${chatId}"}]`
  let chatContent = await dataPost( 
    `Bearer ${localStorage.authToken}`,
    getActiveChatQuery,
    {
      "activeChatQuery": activeChatQuery
    }
  )
  return chatContent.data.ChatFindOne
}

const addNewChatQuery = `mutation addChat ($firstMember_id:ID, $secondMember_id:ID) {
  ChatUpsert(chat: {   
        members: [
      {_id: $firstMember_id}, {_id: $secondMember_id}
    ]}) ${chatQuery}
}`

export const addNewChat = async (firstMemberId: string, secondMemberId: string) => {
  let newChatContent = await dataPost(
    `Bearer ${localStorage.authToken}`,
    addNewChatQuery,
    {
      "firstMember_id": firstMemberId,
      "secondMember_id": secondMemberId
    }
  )
  return newChatContent.data.ChatUpsert
}

const addNewGroupQuery = `mutation addNewGroup ($chat_title:String, $members:[UserInput]) {
  ChatUpsert(chat: {
    title: $chat_title,
    members: $members
  }) ${chatQuery}
}`

export const addNewGroup = async (chatTitle: string, members: UserData[]) => {
  const membersQuery = members.map(member => {
    return {"_id": member._id}
  })
  let newGroupContent = await dataPost( 
    `Bearer ${localStorage.authToken}`,
    addNewGroupQuery,
    {
        "chat_title": chatTitle,
        "members": membersQuery
    }
  )
  return newGroupContent.data.ChatUpsert
}

const updateChatQuery = `mutation changeChatTitle ($chat_id:ID, $chat_title: String) {
  ChatUpsert(chat: { 
    _id: $chat_id, 
    title: $chat_title
  }) ${chatQuery}
}`

export const updateChat = async (chatId: string, chatTitle: string) => {
  let chatContent = await dataPost(
    `Bearer ${localStorage.authToken}`,
    updateChatQuery,
    {
      "chat_id": chatId,
      "chat_title": chatTitle
    }
  )
  return chatContent.data.ChatUpsert
}