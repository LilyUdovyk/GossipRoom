import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { UserData } from "../user/types";

export type ContactsAction = ActionType<typeof actions>

export interface ContactsState {
    readonly contactsData: UserData[]
    readonly newGroupMembers: UserData[]
    readonly error: string | null
}