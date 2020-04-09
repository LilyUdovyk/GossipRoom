import { getType } from "typesafe-actions";

import { AuthState, AuthAction } from "./types";
import * as actions from "./actions";

const initialState: AuthState = {
    authData: {
        authToken: null,
        id: '',
        login: '',
        error: null
    }
}

export default (state: AuthState = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case getType(actions.authByCreds.success):
            return {
                ...state, 
                authData: {
                    ...state.authData, 
                    authToken: action.payload.authToken, 
                    id: action.payload.id, 
                    login: action.payload.login, 
                    error: null
                } 
            }
        case getType(actions.authByCreds.failure):
            return {
                ...state,
                authData: {
                    ...state.authData,
                    authToken: null,
                    error: action.payload
                }
            }
        default:
            return state
    }
}