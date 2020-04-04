import { getType } from "typesafe-actions";

import { ChatsState, ChatsAction } from "./types";
import * as actions from "./actions";

const initialState: ChatsState = {
    chatsData: {
        response: null,
        error: null,
    }
}

export default (state: ChatsState = initialState, action: ChatsAction): ChatsState => {
    switch (action.type) {
        case getType(actions.chatsByCreds.success):
            return {...state, chatsData: { ...state.chatsData, response: action.payload, error: null }}
        case getType(actions.chatsByCreds.failure):
            return {...state, chatsData: { ...state.chatsData, response: null, error: action.payload }}
        default:
            return state
    }
}