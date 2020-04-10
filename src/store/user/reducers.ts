import { getType } from "typesafe-actions";

import { UserState, UserAction } from "./types";
import * as actions from "./actions";

const initialState: UserState = {
    error: null,
    userData: {
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
                error: null,
                userData: action.payload
            }
        case getType(actions.getUser.failure):
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state
    }
}