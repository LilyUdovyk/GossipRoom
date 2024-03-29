import { take, call, put, putResolve } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import jwtDecode from "jwt-decode";

import * as actions from './actions'
import { getAuthToken , regUser } from './utils'
import { getActiveUser } from '../user/utils'
import { DecodedToken } from './types'
import * as userActions from "../../store/user/actions";

export function* authByCredsSaga() {
    const authToken = localStorage.getItem('authToken')
    if (authToken) {
        const decoded: DecodedToken = jwtDecode(authToken);
        const id = decoded.sub.id
        const login = decoded.sub.login
        yield putResolve(actions.authByCreds.success({authToken, id, login}))
        yield put(push('/profile'))
    }
    while (true) {
        const { payload } = yield take(actions.authByCreds.request)
        try {
            const authToken = yield call(getAuthToken, payload.login, payload.password)
            if (authToken) {
                const decoded: DecodedToken = jwtDecode(authToken)
                const id = decoded.sub.id
                const login = decoded.sub.login
                localStorage.setItem('authToken', authToken)
                yield putResolve(actions.authByCreds.success({ authToken, id, login }))
                const user = yield call(getActiveUser, id)
                yield putResolve(userActions.getUser.success(user))
                yield put(push('/profile'))
            } else {
                yield put(actions.authByCreds.failure('Wrong login or password'))
            }
        } catch (error) {
            yield put(actions.authByCreds.failure(error.message))
        }
    }
}

export function* regByCredsSaga() {
    while (true) {
        const { payload } = yield take(actions.regByCreds.request)
        try {
            const user = yield call(regUser, payload.nick, payload.login, payload.password)
        } catch (error) {
            yield put(actions.regByCreds.failure(error.message))
        }
        yield put(actions.authByCreds.request({login: payload.login, password: payload.password}))
        yield put(push('/profile'))
    }
}