import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type ChatAction = ActionType<typeof actions>

export interface ChatState {
    readonly chatData: ChatData
    readonly error: string | null
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

export interface MessageData {
    readonly _id: string
    readonly createdAt: string
    readonly owner: ContactData
    // readonly chat: ChatData
    readonly text: string
    // readonly media: [MediaData]
    // readonly replies: MessageData[]
    // readonly replyTo: MessageData
    // readonly forwarded: MessageData
    // readonly forwardWith: MessageData[]
}

export interface ContactData {
    readonly _id: string
    readonly login: string
    readonly nick : string | null
    readonly avatar: AvatarData | null
}

export interface AvatarData {
    readonly _id: string | null
    readonly url: string | null
}