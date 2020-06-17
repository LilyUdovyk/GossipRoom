import { take, call, put, putResolve } from 'redux-saga/effects';

import * as actions from './actions'
import { getContactsList } from './utils'

export function* getContactsSaga() {
  while (true) {
    yield take(actions.getContacts.request)
    try {
      const сontacts = yield call(getContactsList)
      yield putResolve(actions.getContacts.success(сontacts))
    } catch (error) {
      yield put(actions.getContacts.failure(error.message))
    }
  }
}