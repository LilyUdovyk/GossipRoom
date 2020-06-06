import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { ContactData } from "../user/types";
import { ChatData } from "../chat/types";
import { MediaData } from "../media/types";

export type MessageAction = ActionType<typeof actions>

export interface MessageState {
    readonly messageData: MessageData
    readonly savedMessage: SavedMessageData
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

export interface SavedMessageData {
    readonly originalMessage: MessageData | null
    readonly isReply?: boolean
    readonly isForward?: boolean
}