import { take, call, put, putResolve } from 'redux-saga/effects';

import * as actions from './actions'

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

let getFileData = async (form: HTMLFormElement) => {
    try {
        const response = await fetch('http://chat.fs.a-level.com.ua/upload', 
                        {
                          method: "POST",
                          headers: localStorage.authToken ? { Authorization: 'Bearer ' + localStorage.authToken } : {},
                          body: new FormData(form)
                        }  );
        const result = response.json();
        return response.ok ? result : new Error('Status is not 200')
    } catch (error) {
        return new Error('DataPost failed')
    }
}