import { getType } from "typesafe-actions";

import { ChatState, ChatAction } from "./types";
import * as actions from "./actions";

const initialState: ChatState = {
    error: null,
    chatSuccessData: {
        activeChatName: "Chat",
        activeChat: {
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
}

export default (state: ChatState = initialState, action: ChatAction): ChatState => {
    switch (action.type) {
        case getType(actions.getActiveChat.success):
            return {
                ...state,
                error: null,
                chatSuccessData: {
                    ...state.chatSuccessData,                   
                    activeChat: action.payload.activeChat,
                    activeChatName: action.payload.activeChatName,
                }
            }
        case getType(actions.getActiveChat.failure):
            return {
                ...state,
                error: action.payload,
            }
        case getType(actions.addChat.success):
            return {
                ...state,
                error: null,
                chatSuccessData: {
                    ...state.chatSuccessData,                   
                    activeChat: action.payload.activeChat,
                    activeChatName: action.payload.activeChatName,
                }
            }
        case getType(actions.addChat.failure):
            return {
                ...state,
                error: action.payload,
            }
        case getType(actions.addGroup.success):
            return {
                ...state,
                error: null,
                chatSuccessData: {
                    ...state.chatSuccessData,                   
                    activeChat: action.payload.activeChat,
                    activeChatName: action.payload.activeChatName,
                }
            }
        case getType(actions.addGroup.failure):
            return {
                ...state,
                error: action.payload,
            }
        case getType(actions.updateChat.success):
            return {
                ...state,
                error: null,
                chatSuccessData: {
                    ...state.chatSuccessData,                   
                    activeChat: action.payload.activeChat,
                    activeChatName: action.payload.activeChatName,
                }
            }
        case getType(actions.updateChat.failure):
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state
    }
}