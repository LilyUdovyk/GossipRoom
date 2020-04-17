import { createAsyncAction } from "typesafe-actions";
import { MessageCreds, MessageData } from "./types";

export const sendMessage = createAsyncAction(
    "message/SEND_MESSAGE_REQUEST",
    "message/SEND_MESSAGE_SUCCESS",
    "message/SEND_MESSAGE_FAILURE"
)<MessageCreds, MessageData, string>();