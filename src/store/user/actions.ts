import { createAsyncAction } from "typesafe-actions";
import { UserData, UpdateAvatarCreds } from "../user/types";

export const getUser = createAsyncAction(
    "user/GET_USER_REQUEST",
    "user/GET_USER_SUCCESS",
    "user/GET_USER_FAILURE"
)<void, UserData, string>();


export const updateAvatar = createAsyncAction(
    "media/UPDATE_AVATAR_REQUEST",
    "media/UPDATE_AVATAR_SUCCESS",
    "media/UPDATE_AVATAR_FAILURE"
)<UpdateAvatarCreds, UserData, string>();