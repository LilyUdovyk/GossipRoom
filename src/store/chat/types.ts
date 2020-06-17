import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { MessageData } from "../message/types";
import { UserData, ContactData } from "../user/types";
import { AvatarData } from "../media/types";

export type ChatAction = ActionType<typeof actions>

export interface ChatState {
    readonly chatSuccessData: ChatSuccessData
    readonly error: string | null
}

export interface ChatSuccessData {
    readonly activeChat: ChatData
    readonly activeChatName: string
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

export interface AddGroupCreds {
    readonly chatTitle: string
    readonly members: UserData[]
}

export interface UpdateChatCreds {
    readonly chatId: string
    readonly title: string
}