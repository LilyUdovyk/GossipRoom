import { take, call, put, putResolve } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import jwtDecode from "jwt-decode";

import * as actions from './actions'
import { DecodedToken } from './types'
import { dataPost } from '../../dataPost'

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
        console.log("authByCredsSaga -> payload", payload)
        try {
            const authToken = yield call(getAuthToken, payload.login, payload.password)
            console.log("authByCredsSaga -> authToken", authToken)
            if (authToken) {
                const decoded: DecodedToken = jwtDecode(authToken)
                const id = decoded.sub.id
                const login = decoded.sub.login
                localStorage.setItem('authToken', authToken)
                yield putResolve(actions.authByCreds.success({ authToken, id, login }))
                yield put(push('/profile'))
            } else {
                yield put(actions.authByCreds.failure('Wrong login or password'))
            }
        } catch (error) {
            console.error("authByCredsSaga -> error", error)
            yield put(actions.authByCreds.failure(error.message))
        }
    }
}

const getAuthToken = async (login: string, password: string) => {
    await new Promise((res) => setTimeout(res, 1000))
    let loginContent = await dataPost('http://chat.fs.a-level.com.ua/graphql', '', 
        `query log ($login:String, $password:String) {
            login(login:$login, password:$password)
        }`, 
        {
            "login": login,
            "password": password
        })
    return loginContent.data.login
}

export function* regByCredsSaga() {
    while (true) {
        const { payload } = yield take(actions.regByCreds.request)
        console.log("regByCredsSaga -> payload", payload)
        try {
            const user = yield call(regUser, payload.nick, payload.login, payload.password)
            console.log("regByCredsSaga -> user", user)
            const authToken = yield call(getAuthToken, payload.login, payload.password)
            console.log("regByCredsSaga -> authToken", authToken)
            if (authToken) {
                const decoded: DecodedToken = jwtDecode(authToken)
                const id = decoded.sub.id
                const login = decoded.sub.login
                localStorage.setItem('authToken', authToken)
                yield putResolve(actions.authByCreds.success({ authToken, id, login }))
                yield put(push('/profile'))
            } else {
                yield put(actions.authByCreds.failure('Wrong login or password'))
            }
        } catch (error) {
            console.error(error);
            yield put(actions.regByCreds.failure(error.message))
        }
    }
}

const regUser = async (nick: string, login: string, password: string) => {
    await new Promise((res) => setTimeout(res, 1000))
    let regContent = await dataPost('http://chat.fs.a-level.com.ua/graphql', '',
        `mutation reg($nick:String, $login:String, $password:String) {
            UserUpsert(user: {nick:$nick, login:$login, password:$password}) {
                _id createdAt login nick
                avatar{
                    _id, url
                }
            }
        }`,
        {
            "nick": nick,
            "login": login,
            "password": password
        }  
    )
    return regContent.data.UserUpsert
}