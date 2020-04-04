import { createAction, createAsyncAction } from "typesafe-actions";
import { ChatsCreds } from "./types";
import { ChatData } from "../types";

export const chatsByCreds = createAsyncAction(
    "chats/CHATS_BY_CREDS_REQUEST",
    "chats/CHATS_BY_CREDS_SUCCESS",
    "chats/CHATS_BY_CREDS_FAILURE"
)<ChatsCreds, [ChatData], string>();