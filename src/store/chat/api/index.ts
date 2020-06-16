import { dataPost } from '../../../services/api'
import { chatQuery } from "./utils"

import { UserData } from '../../user/types';


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

export const addNewChat = async (firstMember_id: string, secondMember_id: string) => {
    let newChatContent = await dataPost(
      `Bearer ${localStorage.authToken}`,
      addNewChatQuery,
      {
        "firstMember_id": firstMember_id,
        "secondMember_id": secondMember_id
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

export const updateChat = async (chat_id: string, chatTitle: string) => {
  console.log('chat_id', chat_id, 'chat_title', chatTitle)
  let chatContent = await dataPost(
    `Bearer ${localStorage.authToken}`,
    updateChatQuery,
    {
      "chat_id": chat_id,
      "chat_title": chatTitle
    }
  )
  console.log("chatContent.data.ChatUpsert", chatContent.data)
  return chatContent.data.ChatUpsert
}