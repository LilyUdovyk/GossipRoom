import { getType } from "typesafe-actions";

import { ContactsState, ContactsAction } from "./types";
import * as actions from "./actions";

const initialState: ContactsState = {
    // error: null,
    contactsData: []
}

export default (state: ContactsState = initialState, action: ContactsAction): ContactsState => {
    switch (action.type) {
        case getType(actions.getContacts.success):
            return {
                ...state,
                // error: null,
                contactsData:[
                    ...state.contactsData,
                    ...action.payload
                ]
            }
        case getType(actions.getContacts.failure):
            return {
                ...state,
                contactsData:[]
                // error: action.payload,
            }
        default:
            return state
    }
}