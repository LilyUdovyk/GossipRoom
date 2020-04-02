import { take, call, put, putResolve } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import * as actions from './actions'
import { tokenData } from './types'

export function* regByCredsSaga() {
    const token = localStorage.getItem('token')
    if (token) {
        yield putResolve(actions.regByCreds.success(token))
        yield put(push('/profile'))
    }
    while (true) {
        const { payload } = yield take(actions.regByCreds.request)
        console.log("regByCredsSaga -> payload", payload)
        try {
            const result = yield call(getRegAuthToken, payload.nick, payload.login, payload.password)
            console.log("authByCredsSaga -> result", result)
            localStorage.setItem('token', result)
            yield putResolve(actions.regByCreds.success(result))
            yield put(push('/profile'))
        } catch (error) {
            console.error("authByCredsSaga -> error", error)
            yield put(actions.regByCreds.failure(error.message))
        }
    }
}

const getRegAuthToken = async (nick: string, login: string, password: string) => {
    await new Promise((res) => setTimeout(res, 3000))
    return registration(nick, login, password)
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

const registration = async (nick: string, login: string, password: string) => {
    let regData = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: `mutation reg($n:String, $l:String, $p:String) {
                  UserUpsert(user: {nick:$n, login:$l, password:$p}) {
                    _id createdAt login nick
                    avatar{
                        _id, url
                    }
                  }
                }`,
            variables: {
                "n": nick,
                "l": login,
                "p": password
            }
        })
    }
    let regContent = await dataPost('http://shop-roles.asmer.fs.a-level.com.ua/graphql', regData)

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
                "l": regContent.data.UserUpsert.login,
                "p": password
            }
        })
    }
    let loginContent = await dataPost('http://shop-roles.asmer.fs.a-level.com.ua/graphql', loginData)
    return loginContent.data.login
}

// const authorization = async (login: string, password: string) => {
//     let loginData = {
//         method: 'post',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//         },
//         body: JSON.stringify({
//             query: `query log ($l:String, $p:String) {
//                     login(login:$l, password:$p)
//                 }`,
//             variables: {
//                 "l": regContent.data.UserUpsert.login,
//                 "p": password
//             }
//         })
//     }
//     let loginContent = await dataPost('http://shop-roles.asmer.fs.a-level.com.ua/graphql', loginData)
//     return loginContent.data.login
// }