import { take, call, put, putResolve, select } from 'redux-saga/effects';
// import { push } from 'connected-react-router';

import * as actions from './actions'
import { dataPost } from '../../dataPost'

export function* changeAvatarSaga() {
  while (true) {
    const { payload } = yield take(actions.changeAvatar.request)
    console.log("changeAvatarSaga", payload)
    try {
      const image = yield call(getNewImageData, payload.user_id, payload.form)
      console.log("changeAvatarSaga -> image", image)
      yield putResolve(actions.changeAvatar.success(image))
      // yield put(push('/user'))
    } catch (error) {
      console.error("changeAvatarSaga -> error", error)
      yield put(actions.changeAvatar.failure(error.message))
    }
  }
}

let getNewImageData = async (user_id: string, form: HTMLFormElement) => {
  try {
    const response = await fetch('http://shop-roles.asmer.fs.a-level.com.ua/upload', 
                    {
                      method: "POST",
                      headers: localStorage.authToken ? {
                        Authorization: 'Bearer ' + localStorage.authToken
                      } : {},
                      body: new FormData(form)
                    }  );
    const result = response.json();
    console.log(result)
    return response.ok ? result : new Error('status is not 200')
  } catch (error) {
    return new Error('dataPost failed')
  }

}
