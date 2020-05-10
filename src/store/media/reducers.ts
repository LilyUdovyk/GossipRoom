import { getType } from "typesafe-actions";

import { MediaState, MediaAction } from "./types";
import * as actions from "./actions";

const initialState: MediaState = {
    error: null,
    avatarData: {
        _id: '',
        url: ''
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
        case getType(actions.uploadAvatar.success):
            return {
                ...state,
                error: null,
                avatarData: action.payload
            }
        case getType(actions.uploadAvatar.failure):
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state
    }
}