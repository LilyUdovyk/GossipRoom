import { take, call, put, putResolve } from 'redux-saga/effects';

import * as actions from './actions'
import { getFileData } from './utils'

export function* uploadFileSaga() {
  while (true) {
    const { payload } = yield take(actions.uploadFile.request)
    try {
      const fileData = yield call(getFileData, payload)
      yield putResolve(actions.uploadFile.success(fileData))
    } catch (error) {
      yield put(actions.uploadFile.failure(error.message))
    }
  }
}