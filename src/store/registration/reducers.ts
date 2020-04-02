import { getType } from "typesafe-actions";

import { RegState, RegAction } from "./types";
import * as actions from "./actions";

const initialState: RegState = {
    regData: {
        token: null,
        error: null,
    }
}

export default (state: RegState = initialState, action: RegAction): RegState => {
    switch (action.type) {
        case getType(actions.regByCreds.success):
            return {...state, regData: { ...state.regData, token: action.payload, error: null }}
        case getType(actions.regByCreds.failure):
            return {...state, regData: { ...state.regData, token: null, error: action.payload }}
        default:
            return state
    }
}