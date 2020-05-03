import { createAsyncAction } from "typesafe-actions";
import { ChangeAvatarCreds, MediaData } from "./types";

export const changeAvatar = createAsyncAction(
    "media/CHANGE_AVATAR_REQUEST",
    "media/CHANGE_AVATAR_SUCCESS",
    "media/CHANGE_AVATAR_FAILURE"
)<ChangeAvatarCreds, MediaData, string>();