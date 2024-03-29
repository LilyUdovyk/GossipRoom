import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { ChatData } from "../chat/types";
import { AvatarData } from "../media/types";

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

export interface ContactData {
    readonly _id: string
    readonly login: string
    readonly nick: string | null
    readonly avatar: AvatarData | null
}


export interface UpdateUserCreds {
    readonly userId: string
    readonly imageId: string | null
    readonly login: string
    readonly nick: string | null
    readonly password: string
}