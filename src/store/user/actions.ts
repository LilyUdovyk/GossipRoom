import { createAsyncAction } from "typesafe-actions";
import { UserData, UpdateUserCreds } from "../user/types";

export const getUser = createAsyncAction(
    "user/GET_USER_REQUEST",
    "user/GET_USER_SUCCESS",
    "user/GET_USER_FAILURE"
)<void, UserData, string>();

export const updateUser = createAsyncAction(
    "user/UPDATE_USER_REQUEST",
    "user/UPDATE_USER_SUCCESS",
    "user/UPDATE_USER_FAILURE"
)<UpdateUserCreds, UserData, string>();