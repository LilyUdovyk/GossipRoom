import { take, call, put, putResolve, select } from 'redux-saga/effects';

import * as actions from './actions'
import { dataPost } from '../../dataPost'

export function* uploadAvatarSaga() {
  while (true) {
    const { payload } = yield take(actions.uploadAvatar.request)
    console.log("uploadAvatarSaga", payload.form)
    try {
      const imageData = yield call(getNewImageData, payload)
      console.log("uploadAvatarSaga -> image", imageData)
      yield putResolve(actions.uploadAvatar.success(imageData))
    } catch (error) {
      console.error("uploadAvatarSaga -> error", error)
      yield put(actions.uploadAvatar.failure(error.message))
    }
  }
}

let getNewImageData = async (form: HTMLFormElement) => {
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