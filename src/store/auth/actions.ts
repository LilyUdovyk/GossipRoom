import { createAction, createAsyncAction } from "typesafe-actions";
import { AuthCreds } from "./types";

export const authByCreds = createAsyncAction(
    "auth/AUTH_BY_CREDS_REQUEST",
    "auth/AUTH_BY_CREDS_SUCCESS",
    "auth/AUTH_BY_CREDS_FAILURE"
)<AuthCreds, string, string>();

export const logout = createAction(
    "auth/LOGOUT"
)();
