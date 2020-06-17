import { dataPost } from '../../services/api'

export const messageQuery = 
`{
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
}`

const sendMessageQuery = `mutation sendMessage ($chat_id:ID, $text:String) {
  MessageUpsert(message: {
      chat: {_id: $chat_id}, 
      text: $text
  }) ${messageQuery}
}`

export const sendMessage = async (chatId: string, text: string) => {
  let messageContent = await dataPost(
    `Bearer ${localStorage.authToken}`,
    sendMessageQuery,
    {
      "chat_id": chatId,
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

export const sendMessageacWithAtthment = async (chatId: string, text: string, mediaId: string) => {
  let messageContent = await dataPost(
    `Bearer ${localStorage.authToken}`,
    sendMessageWithAtthmentQuery,
    {
      "chat_id": chatId,
      "text": text,
      "media_id": mediaId
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


export const replyToMessage = async (chatId: string, text: string, originalMessageId: string) => {
  let messageContent = await dataPost(
    `Bearer ${localStorage.authToken}`,
    replyToMessageQuery,
    {
      "chat_id": chatId,
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


export const forwardMessage = async (chatId: string, text: string, originalMessageId: string) => {
  let messageContent = await dataPost( 
    `Bearer ${localStorage.authToken}`,
    forwardMessageQuery,
    {
      "chat_id": chatId,
      "text": text,
      "message_id": originalMessageId
    }
  )
  return messageContent.data.MessageUpsert
}