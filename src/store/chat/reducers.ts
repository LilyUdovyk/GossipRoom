import { getType } from "typesafe-actions";

import { ChatState, ChatAction } from "./types";
import * as actions from "./actions";

const initialState: ChatState = {
    activeChatId: null,
    activeChatName: "Chat",
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
                activeChatId: action.payload.activeChatId,
                activeChatName: action.payload.activeChatName,
                error: null,
                chatData: action.payload.activeChat
            }
        case getType(actions.getActiveChat.failure):
            return {
                ...state,
                error: action.payload,
            }
        case getType(actions.addChat.success):
            return {
                ...state,
                activeChatId: action.payload.activeChatId,
                error: null,
                chatData: action.payload.newChat
            }
        case getType(actions.addChat.failure):
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state
    }
}