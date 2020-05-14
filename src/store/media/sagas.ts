import { take, call, put, putResolve, select } from 'redux-saga/effects';

import * as actions from './actions'
// import { dataPost } from '../../dataPost'

export function* uploadFileSaga() {
  while (true) {
    const { payload } = yield take(actions.uploadFile.request)
    console.log("uploadFileSaga", payload.form)
    try {
      const fileData = yield call(getFileData, payload)
      console.log("uploadFileSaga -> file", fileData)
      yield putResolve(actions.uploadFile.success(fileData))
    } catch (error) {
      console.error("uploadFileSaga -> error", error)
      yield put(actions.uploadFile.failure(error.message))
    }
  }
}

let getFileData = async (form: HTMLFormElement) => {
    try {
        console.log(form)
        const response = await fetch('http://chat.fs.a-level.com.ua/upload', 
                        {
                          method: "POST",
                          headers: localStorage.authToken ? { Authorization: 'Bearer ' + localStorage.authToken } : {},
                          body: new FormData(form)
                        }  );
        console.log(response)
        const result = response.json();
        return response.ok ? result : new Error('status is not 200')
    } catch (error) {
        return new Error('dataPost failed')
    }
}