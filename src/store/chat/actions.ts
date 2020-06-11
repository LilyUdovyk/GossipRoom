import { createAsyncAction } from "typesafe-actions";
import { ChatSuccessData, AddChatSuccessData, AddGroupCreds } from "./types";

export const getActiveChat = createAsyncAction(
    "chat/GET_ACTIVE_CHAT_REQUEST",
    "chat/GET_ACTIVE_CHAT_SUCCESS",
    "chat/GET_ACTIVE_CHAT_FAILURE"
)<string, ChatSuccessData, string>();

export const addChat = createAsyncAction(
    "chat/ADD_CHAT_REQUEST",
    "chat/ADD_CHAT_SUCCESS",
    "chat/ADD_CHAT_FAILURE"
)<string, AddChatSuccessData, string>();

export const addGroup = createAsyncAction(
    "chat/ADD_GROUP_REQUEST",
    "chat/ADD_GROUP_SUCCESS",
    "chat/ADD_GROUP_FAILURE"
)<AddGroupCreds, AddChatSuccessData, string>();