import { take, call, put, putResolve, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import * as actions from './actions'
import { getActiveUser, updateUser } from './utils'

export function* getUserSaga() {
  while (true) {
    yield take(actions.getUser.request)
    try {
      const userId = yield select(state => state.auth.authData.id)
      const user = yield call(getActiveUser, userId)
      yield putResolve(actions.getUser.success(user))
    } catch (error) {
      yield put(actions.getUser.failure(error.message))
    }
  }
}

export function* updateUserSaga() {
  while (true) {
    const { payload } = yield take(actions.updateUser.request)
    try {
        const prevAvatar = yield select(state => state.user.userData.avatar)
        const prevAvatarId = prevAvatar ? prevAvatar._id : null
        const prevPassword = yield select(state => state.user.userData.password)            
        const imageId = payload.imageId === null ? prevAvatarId : payload.imageId        
        const password = payload.password === "" ? prevPassword: payload.password
        const user = yield call(updateUser, payload.userId, imageId, payload.nick, payload.login, password)
        yield putResolve(actions.updateUser.success(user))
        yield put(push('/profile'))
    } catch (error) {
        yield put(actions.updateUser.failure(error.message))
    }
  }
}

export function* logoutSaga() {
  while (true) {
    yield take(actions.logout)
    localStorage.clear();
    yield put(push('/log-in'))
  }
}