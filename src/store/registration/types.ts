import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type RegAction = ActionType<typeof actions>

export interface RegState {
    readonly regData: RegData
}

export interface RegData {
    readonly token: string | null
    readonly error: string | null
}

export interface RegCreds {
    readonly nick: string
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