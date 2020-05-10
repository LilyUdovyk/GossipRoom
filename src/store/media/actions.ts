import { createAsyncAction } from "typesafe-actions";
import { AvatarData } from "./types";

export const uploadAvatar = createAsyncAction(
    "media/UPLOAD_AVATAR_REQUEST",
    "media/UPLOAD_AVATAR_SUCCESS",
    "media/UPLOAD_AVATAR_FAILURE"
)<HTMLFormElement, AvatarData, string>();