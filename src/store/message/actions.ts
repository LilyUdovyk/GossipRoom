import { createAsyncAction, createAction } from "typesafe-actions";
import { MessageCreds, MessageData, ReplyCreds } from "./types";

export const sendMessage = createAsyncAction(
    "message/SEND_MESSAGE_REQUEST",
    "message/SEND_MESSAGE_SUCCESS",
    "message/SEND_MESSAGE_FAILURE"
)<MessageCreds, MessageData, string>();

export const onMessage = createAction(
    "message/ON_MESSAGE", (message: MessageData) => message
)();

export const saveOriginalMessage = createAction(
    "message/SAVE_ORIGINAL_MESSAGE", (message: MessageData) => message
)();

export const replyToMessage = createAsyncAction(
    "message/REPLY_TO_MESSAGE_REQUEST",
    "message/REPLY_TO_MESSAGE_SUCCESS",
    "message/REPLY_TO_MESSAGE_FAILURE"
)<ReplyCreds, MessageData, string>();
