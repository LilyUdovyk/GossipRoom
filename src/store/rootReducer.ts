import { combineReducers } from "redux";
import { useReducer } from "react";
import { EmptyAction, StateType } from "typesafe-actions";
import { connectRouter } from "connected-react-router";
import { history } from "../history";

import { AuthAction } from "./auth/types";
import authReducer from './auth/reducers'
import { UserAction } from "./user/types";
import userReducer from './user/reducers'
import { ContactsAction } from "./contacts/types";
import contactsReducer from './contacts/reducers'
import { ChatAction } from "./chat/types";
import chatReducer from './chat/reducers'
import { MessageAction } from "./message/types";
import messageReducer from './message/reducers'

const rootReducer = combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    user: userReducer,
    contacts: contactsReducer,
    chat: chatReducer,
    message: messageReducer
})

export type IRootState = StateType<typeof rootReducer>
export type IRootAction = AuthAction 
                        | UserAction 
                        | ContactsAction 
                        | ChatAction 
                        | MessageAction 
                        | EmptyAction<string>

export default rootReducer