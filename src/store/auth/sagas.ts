import { take, call, put, putResolve } from 'redux-saga/effects';
import { push } from 'connected-react-router';
// import axios from 'axios'

import * as actions from './actions'
import { tokenData } from './types'

export function* authByCredsSaga() {
    const token = localStorage.getItem('token')
    if (token) {
        yield putResolve(actions.authByCreds.success(token))
        yield put(push('/profile'))
    }
    while (true) {
        const { payload } = yield take(actions.authByCreds.request)
        console.log("authByCredsSaga -> payload", payload)
        try {
            const result = yield call(getAuthToken, payload.login, payload.password)
            console.log("authByCredsSaga -> result", result)
            localStorage.setItem('token', result)
            yield putResolve(actions.authByCreds.success(result))
            yield put(push('/profile'))
        } catch (error) {
            console.error("authByCredsSaga -> error", error)
            yield put(actions.authByCreds.failure(error.message))
        }
    }
}

const getAuthToken = async (login: string, password: string) => {
    await new Promise((res) => setTimeout(res, 3000))
    return authorization(login, password)
}

const dataPost = async (url: string, data: tokenData) => {
    try {
        const response = await fetch(url, data);
        const result = response.json();
        return response.ok ? result : new Error('status is not 200')
    } catch (error) {
        return new Error('dataPost failed')
    }
}

const authorization = async (login: string, password: string) => {
    let loginData = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: `query log ($l:String, $p:String) {
                    login(login:$l, password:$p)
                }`,
            variables: {
                "l": login,
                "p": password
            }
        })
    }
    let loginContent = await dataPost('http://shop-roles.asmer.fs.a-level.com.ua/graphql', loginData)
    return loginContent.data.login
}