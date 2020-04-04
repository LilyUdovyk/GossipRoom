import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { ChatData } from "../types";


export type ChatsAction = ActionType<typeof actions>

export interface ChatsState {
    readonly chatsData: ChatsData
}

export interface ChatsData {
    readonly response: [ChatData] | null
    readonly error: string | null
}

export interface ChatsCreds {
    readonly id: string
}
