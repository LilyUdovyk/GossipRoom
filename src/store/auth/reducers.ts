import { getType } from "typesafe-actions";

import { AuthState, AuthAction } from "./types";
import * as actions from "./actions";

const initialState: AuthState = {
    authData: {
        token: null,
        error: null,
    }
}

export default (state: AuthState = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case getType(actions.authByCreds.success):
            return {...state, authData: { ...state.authData, token: action.payload, error: null }}
        case getType(actions.authByCreds.failure):
            return {...state, authData: { ...state.authData, token: null, error: action.payload }}
        default:
            return state
    }
}