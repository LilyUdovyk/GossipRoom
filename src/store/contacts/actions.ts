import { createAsyncAction, createAction } from "typesafe-actions";
import { UserData } from "../user/types";

export const getContacts = createAsyncAction(
    "contacts/GET_CONTACTS_REQUEST",
    "contacts/GET_CONTACTS_SUCCESS",
    "contacts/GET_CONTACTS_FAILURE"
)<void, UserData[], string>();