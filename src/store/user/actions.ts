import { createAction, createAsyncAction } from "typesafe-actions";
import { UserData } from "./types";

export const getUser = createAsyncAction(
    "user/GET_USER_REQUEST",
    "user/GET_USER_SUCCESS",
    "user/GET_USER_FAILURE"
)<void, UserData, string>();