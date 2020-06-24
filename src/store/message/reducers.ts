import { getType } from "typesafe-actions";

import { MessageState, MessageAction } from "./types";
import * as actions from "./actions";

const initialState: MessageState = {
    error: null,
    newMessage: null,
    savedMessage: {
        originalMessage: null,
        isReply: false,
        isForward: false,
    },
    messageData: {
        _id: '',
        createdAt: '',
        owner: {
            _id: '',
            login: '',
            nick : '',
            avatar: {
                _id: '',
                url: ''
            }
        },
        chat: {
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
        },
        text: '',
        media:[],
        replies: [],
        replyTo: {
            _id: '',
            text: '',
            media: [],
            owner: {
                _id: '',
                login: '',
                nick : ''
            }
        },
        forwarded: {
            _id: '',
            text: '',
            media: [],
            owner: {
                _id: '',
                login: '',
                nick : ''
            }
        },
        forwardWith: []
    }
}

export default (state: MessageState = initialState, action: MessageAction): MessageState => {
    switch (action.type) {
        case getType(actions.sendMessage.success):
            return {
                ...state,
                error: null,
                messageData: action.payload,
            }
        case getType(actions.sendMessage.failure):
            return {
                ...state,
                error: action.payload,
            }
        case getType(actions.onMessage):
            return {
                ...state,
                error: null,
                newMessage: {
                    newMessageId: action.payload._id,
                    newMessageChatId: action.payload.chat._id,
                },
                messageData: action.payload,
            }
        case getType(actions.saveOriginalMessage):
            return {
                ...state,
                error: null, 
                savedMessage: {
                    ...state.savedMessage,
                    originalMessage: action.payload.originalMessage,
                    isReply: action.payload.isReply,
                    isForward: action.payload.isForward
                }
            }
        case getType(actions.replyToMessage.success):
            return {
                ...state,
                error: null,
                messageData: action.payload,
                savedMessage: {
                    ...state.savedMessage,
                    originalMessage: null,
                    isReply: false
                }               
            }
        case getType(actions.replyToMessage.failure):
            return {
                ...state,
                error: action.payload,
            }
        case getType(actions.forwardMessage.success):
            return {
                ...state,
                error: null,
                messageData: action.payload,
                savedMessage: {
                    ...state.savedMessage,
                    originalMessage: null,
                    isForward: false
                }
            }
        case getType(actions.forwardMessage.failure):
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state
    }
}