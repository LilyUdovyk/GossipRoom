import { createAction, createAsyncAction } from "typesafe-actions";
import { AuthCreds, RegCreds, AuthSuccessData } from "./types";

export const authByCreds = createAsyncAction(
    "auth/AUTH_BY_CREDS_REQUEST",
    "auth/AUTH_BY_CREDS_SUCCESS",
    "auth/AUTH_BY_CREDS_FAILURE"
)<AuthCreds, AuthSuccessData, string>();

export const regByCreds = createAsyncAction(
    "auth/REG_BY_CREDS_REQUEST",
    "auth/REG_BY_CREDS_SUCCESS",
    "auth/REG_BY_CREDS_FAILURE"
)<RegCreds, AuthSuccessData, string>();

export const logout = createAction(
    "auth/LOGOUT"
)();