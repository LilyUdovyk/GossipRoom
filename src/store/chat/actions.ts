import { createAsyncAction } from "typesafe-actions";
import { ChatSuccessData } from "./types";

export const getActiveChat = createAsyncAction(
    "chat/GET_ACTIVE_CHAT_REQUEST",
    "chat/GET_ACTIVE_CHAT_SUCCESS",
    "chat/GET_ACTIVE_CHAT_FAILURE"
)<string, ChatSuccessData, string>();