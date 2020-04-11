import { getType } from "typesafe-actions";

import { ChatState, ChatAction } from "./types";
import * as actions from "./actions";

const initialState: ChatState = {
    error: null,
    chatData: {
        _id: '',
        owner: {
            _id: '',
            login: '',
            nick : '',
            avatar: {
                _id: '',
                url: ''
            }
        },
        title: '',
        createdAt: '',
        members: [],
        messages: [],
        avatar: {
            _id: '',
            url: ''
        }
    }
}

export default (state: ChatState = initialState, action: ChatAction): ChatState => {
    switch (action.type) {
        case getType(actions.getActiveChat.success):
            return {
                ...state,
                error: null,
                chatData: action.payload
            }
        case getType(actions.getActiveChat.failure):
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state
    }
}