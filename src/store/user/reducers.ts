import { getType } from "typesafe-actions";

import { UserState, UserAction } from "./types";
import * as actions from "./actions";

const initialState: UserState = {
    userData: {
        error: null,
        id: '',
        createdAt: '',
        login: '',
        nick : '',
        avatar: {
            id: '',
            url: ''
        }
    }
}

export default (state: UserState = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case getType(actions.getUser.success):
            return {
                ...state,
                userData: {
                    ...state.userData,
                    error: null,
                    id: action.payload.id,
                    createdAt: action.payload.createdAt,
                    login: action.payload.login,
                    nick : action.payload.nick,
                    avatar: action.payload.avatar
                }
            }
        case getType(actions.getUser.failure):
            return {
                ...state,
                userData: {
                    ...state.userData,
                    error: action.payload,
                }
            }
        default:
            return state
    }
}