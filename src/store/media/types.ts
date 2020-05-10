import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type MediaAction = ActionType<typeof actions>

export interface MediaState {
    readonly mediaData: MediaData
    readonly avatarData: AvatarData
    readonly error: string | null
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

export interface ChatData {
    readonly _id: string
    readonly owner: ContactData
    readonly title: string | null
    readonly createdAt: string
    readonly members: ContactData[]
    readonly messages: MessageData[] | null
    readonly avatar: AvatarData | null
}

export interface AvatarData {
    readonly _id: string | null
    readonly url: string | null
}

export interface ContactData {
    readonly _id: string
    readonly login: string
    readonly nick : string | null
    readonly avatar: AvatarData | null
}

export interface MessageData {
    readonly _id: string
    readonly createdAt: string
    readonly owner: ContactData
    readonly text: string
    // readonly chat: ChatData
    // readonly media: [MediaData]
    // readonly replies: MessageData[]
    // readonly replyTo: MessageData
    // readonly forwarded: MessageData
    // readonly forwardWith: MessageData[]
}