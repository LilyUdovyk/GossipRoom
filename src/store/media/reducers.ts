import { getType } from "typesafe-actions";

import { MediaState, MediaAction } from "./types";
import * as actions from "./actions";

const initialState: MediaState = {
    error: null,
    fileData: {
        _id: null,
        url: null
    },
    mediaData: {
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
        text: '',
        url: '',
        originalFileName: '',
        type: '',
        userAvatar: {
            _id: '',
            login: '',
            nick : '',
            avatar: {
                _id: '',
                url: ''
            }
        },
        chatAvatar: [],
        messages: []
    }
}

export default (state: MediaState = initialState, action: MediaAction): MediaState => {
    switch (action.type) {
        case getType(actions.uploadFile.success):
            return {
                ...state,
                error: null,
                fileData: action.payload
            }
        case getType(actions.uploadFile.failure):
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state
    }
}