import { combineReducers } from "redux";
import { EmptyAction, StateType } from "typesafe-actions";
import { connectRouter } from "connected-react-router";
import { history } from "../history";

import { AuthAction } from "./auth/types";
import authReducer from './auth/reducers'
import { RegAction } from "./registration/types";
import regReducer from './registration/reducers'

const rootReducer = combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    registration: regReducer
})

export type IRootState = StateType<typeof rootReducer>
export type IRootAction = AuthAction | RegAction | EmptyAction<string>

export default rootReducer