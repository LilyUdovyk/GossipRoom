import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type UserAction = ActionType<typeof actions>

export interface UserState {
    readonly userData: UserData
    readonly error: string | null
}

export interface UserData {
    readonly _id: string
    readonly createdAt: string
    readonly login: string
    readonly nick : string | null
    readonly avatar: AvatarData | null
    readonly chats: ChatData[]
}

export interface AvatarData {
    readonly _id: string | null
    readonly url: string | null
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

export interface MessageData {
    readonly _id: string
    readonly createdAt: string
    readonly owner: ContactData
    readonly text: string
    readonly chat: ChatData
    readonly media: MediaData[]
    readonly replies: MessageData[]
    readonly replyTo: MessageData
    readonly forwarded: MessageData
    readonly forwardWith: MessageData[]
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

export interface UpdateAvatarCreds {
    readonly user_id: string
    readonly image_id: string | null
}