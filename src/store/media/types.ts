import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { ContactData } from "../user/types";
import { ChatData } from "../chat/types";
import { MessageData } from "../message/types";

export type MediaAction = ActionType<typeof actions>

export interface MediaState {
    readonly mediaData: MediaData
    readonly fileData: FileData
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


export interface AvatarData {
    readonly _id: string | null
    readonly url: string | null
}

export interface FileData {
    readonly _id: string | null
    readonly url: string | null
}