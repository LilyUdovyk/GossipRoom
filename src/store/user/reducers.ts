import { getType } from "typesafe-actions";

import { UserState, UserAction } from "./types";
import * as actions from "./actions";

const initialState: UserState = {
    error: null,
    userData: {
        _id: '',
        createdAt: '',
        login: '',
        nick : '',
        avatar: {
            _id: '',
            url: ''
        },
        chats: []
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
        case getType(actions.updateUser.success):
            return {
                ...state,
                error: null,
                userData: action.payload
            }
        case getType(actions.updateUser.failure):
            return {
                ...state,
                error: action.payload,
            }  
        case getType(actions.logout):
            return {
                ...state,
                error: null,
                userData: {
                    _id: '',
                    createdAt: '',
                    login: '',
                    nick : '',
                    avatar: {
                        _id: '',
                        url: ''
                    },
                    chats: []
                }
            }  
        default:
            return state
    }
}