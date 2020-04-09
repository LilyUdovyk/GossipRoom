import { combineReducers } from "redux";
import { useReducer } from "react";
import { EmptyAction, StateType } from "typesafe-actions";
import { connectRouter } from "connected-react-router";
import { history } from "../history";

import { AuthAction } from "./auth/types";
import authReducer from './auth/reducers'
// import { RegAction } from "./registration/types";
// import regReducer from './registration/reducers'
import { UserAction } from "./user/types";
import userReducer from './user/reducers'
// import { ChatsAction } from "./chats/types";
// import chatsReducer from './chats/reducers'

const rootReducer = combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    // registration: regReducer,
    user: userReducer,
    // chats: chatsReducer
})

export type IRootState = StateType<typeof rootReducer>
export type IRootAction = AuthAction | UserAction | EmptyAction<string>

export default rootReducer