import { getType } from "typesafe-actions";

import { MediaState, MediaAction } from "./types";
import * as actions from "./actions";

const initialState: MediaState = {
    error: null,
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
        case getType(actions.changeAvatar.success):
            return {
                ...state,
                error: null,
                mediaData: action.payload
            }
        case getType(actions.changeAvatar.failure):
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state
    }
}