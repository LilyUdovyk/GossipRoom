import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type MessageAction = ActionType<typeof actions>

export interface MessageState {
    readonly messageData: MessageData
    readonly savedMessage: SavedMessageData
    // originalMessage: MessageData | null
    readonly error: string | null
}

export interface MessageData {
    readonly _id: string
    readonly createdAt: string
    readonly owner: ContactData
    readonly chat: ChatData
    readonly text: string
    readonly media: MediaData[]
    readonly replies: MessageData[]
    readonly replyTo: ReplyData
    readonly forwarded: ReplyData
    readonly forwardWith: MessageData[]
}

export interface MessageCreds {
    readonly activeChatId: string
    readonly text?: string
    readonly mediaId?: any | null
}

export interface ReplyCreds {
    readonly activeChatId: string
    readonly text?: string
    readonly originalMessageId: string | null
}

export interface ReplyData {
    readonly _id: string
    readonly text: string
    readonly media: MediaData[]
    readonly owner: {
        readonly _id: string
        readonly login: string
        readonly nick : string | null
    }
}

export interface ChatData {
    readonly _id: string
    readonly owner: ContactData
    readonly title: string | null
    readonly createdAt: string
    readonly members: ContactData[]
    readonly messages: MessageData[] | null
    readonly avatar: AvatarData | null
}

export interface ContactData {
    readonly _id: string
    readonly login: string
    readonly nick : string | null
    readonly avatar: AvatarData | null
}

export interface MediaData {
    readonly _id: string
    readonly createdAt: string
    readonly owner: ContactData 
    readonly text: string
    readonly url: string
    readonly originalFileName: string
    readonly type: string
    readonly userAvatar: ContactData 
    readonly chatAvatar: ChatData[]
    readonly messages: MessageData[]
}

export interface AvatarData {
    readonly _id: string | null
    readonly url: string | null
}

export interface SavedMessageData {
    readonly originalMessage: MessageData | null
    readonly isReply?: boolean
    readonly isForward?: boolean
}