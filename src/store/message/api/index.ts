import { dataPost } from '../../../services/api'
import { messageQuery } from "./utils"

const sendMessageQuery = `mutation sendMessage ($chat_id:ID, $text:String) {
  MessageUpsert(message: {
      chat: {_id: $chat_id}, 
      text: $text
  }) ${messageQuery}
}`

export const sendMessage = async (chat_id: string, text: string) => {
  let messageContent = await dataPost(
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

export const sendMessageacWithAtthment = async (chat_id: string, text: string, media_id: string) => {
  let messageContent = await dataPost(
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

const replyToMessageQuery = `mutation replyToMessage ($message_id:ID, $chat_id:ID, $text:String) {
  MessageUpsert(message: {
    chat: {_id: $chat_id},
    text: $text
    replyTo: {
      _id: $message_id,
    }
  }) ${messageQuery}
}`


export const replyToMessage = async (chat_id: string, text: string, originalMessageId: string) => {
  let messageContent = await dataPost(
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

const forwardMessageQuery = `mutation forwardedMessage ($chat_id:ID, $message_id:ID, $text:String) {
  MessageUpsert(message: {
    chat: {_id: $chat_id},
    text: $text,
    forwarded: {
    	_id: $message_id,
    }
  }) ${messageQuery}
}`


export const forwardMessage = async (chat_id: string, text: string, originalMessageId: string) => {
  let messageContent = await dataPost( 
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