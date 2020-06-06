import { createAsyncAction, createAction } from "typesafe-actions";
import { UserData } from "./types";

export const getContacts = createAsyncAction(
    "contacts/GET_CONTACTS_REQUEST",
    "contacts/GET_CONTACTS_SUCCESS",
    "contacts/GET_CONTACTS_FAILURE"
)<void, UserData[], string>();

export const setMembers = createAction(
    "contacts/SET_MEMBERS", (member: UserData) => member
)();

export const getMembers = createAsyncAction(
    "contacts/GET_MEMBERS_REQUEST",
    "contacts/GET_MEMBERS_SUCCESS",
    "contacts/GET_MEMBERS_FAILURE"
)<void, UserData[], string>();