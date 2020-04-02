import { createAction, createAsyncAction } from "typesafe-actions";
import { RegCreds } from "./types";

export const regByCreds = createAsyncAction(
    "registration/REG_BY_CREDS_REQUEST",
    "registration/REG_BY_CREDS_SUCCESS",
    "registration/REG_BY_CREDS_FAILURE"
)<RegCreds, string, string>();