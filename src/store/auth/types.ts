import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type AuthAction = ActionType<typeof actions>

export interface AuthState {
    readonly authData: AuthData
}

export interface AuthData {
    readonly authToken: string | null
    readonly id: string
    readonly login: string
    readonly error: string | null
}

export interface AuthSuccessData {
    readonly authToken: string
    readonly id: string
    readonly login: string
}

export interface AuthCreds {
    readonly login: string
    readonly password: string
}

export interface RegCreds {
    readonly nick: string
    readonly login: string
    readonly password: string
}

export interface DecodedToken {
    sub: {
      id: string,
      login: string,
      acl: [string]
    },
    iat: number
}