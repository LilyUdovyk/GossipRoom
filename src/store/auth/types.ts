import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type AuthAction = ActionType<typeof actions>

export interface AuthState {
    readonly authData: AuthData
}

export interface AuthData {
    readonly token: string | null
    readonly error: string | null
}

export interface AuthCreds {
    readonly login: string
    readonly password: string
}

export interface tokenData {
    method: string;
    headers: {
        'Content-Type': string;
        'Accept': string;
    };
    body: string;
}