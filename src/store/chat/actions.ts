import { createAction, createAsyncAction } from "typesafe-actions";
import { ChatData } from "./types";

export const getActiveChat = createAsyncAction(
    "chat/GET_ACTIVE_CHAT_REQUEST",
    "chat/GET_ACTIVE_CHAT_SUCCESS",
    "chat/GET_ACTIVE_CHAT_FAILURE"
)<void, ChatData, string>();