import { getType } from "typesafe-actions";

import { MessageState, MessageAction } from "./types";
import * as actions from "./actions";

const initialState: MessageState = {
    error: null,
    originalMessageId: null,
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
                messageData: action.payload,
            }
        case getType(actions.saveOriginalMessage):
            return {
                ...state,
                error: null,
                originalMessageId: action.payload._id,
            }
        case getType(actions.replyToMessage.success):
            return {
                ...state,
                error: null,
                messageData: action.payload,
            }
        case getType(actions.replyToMessage.failure):
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state
    }
}