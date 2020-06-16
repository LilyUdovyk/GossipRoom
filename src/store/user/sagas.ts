import { take, call, put, putResolve, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import * as actions from './actions'
import { getActiveUser, updateAvatar, updateUser } from './api'

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

export function* updateAvatarSaga() {
  while (true) {
    const { payload } = yield take(actions.updateAvatar.request)
    try {
      const userData = yield call(updateAvatar, payload.user_id, payload.image_id)
      yield putResolve(actions.updateAvatar.success(userData))
    } catch (error) {
      yield put(actions.updateAvatar.failure(error.message))
    }
  }
}

export function* updateUserSaga() {
  while (true) {
      const { payload } = yield take(actions.updateUser.request)
      try {
          const prevAvatar = yield select(state => state.user.userData.avatar)
          const prevAvatar_id = prevAvatar ? prevAvatar._id : null
          const prevPassword = yield select(state => state.user.userData.password)            
          const image_id = payload.image_id === null ? prevAvatar_id : payload.image_id        
          const password = payload.password === "" ? prevPassword: payload.password
          const user = yield call(updateUser, payload.user_id, image_id, payload.nick, payload.login, password)
          yield putResolve(actions.updateUser.success(user))
          yield put(push('/profile'))
      } catch (error) {
          yield put(actions.updateUser.failure(error.message))
      }
  }
}