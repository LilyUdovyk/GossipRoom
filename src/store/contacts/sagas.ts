import { take, call, put, putResolve } from 'redux-saga/effects';
// import { push } from 'connected-react-router';

import * as actions from './actions'
import { dataPost } from '../../dataPost'

export function* getContactsSaga() {
  while (true) {
    yield take(actions.getContacts.request)
    console.log("getContactsSaga")
    try {
      const сontacts = yield call(getContactsList)
      console.log("getContactsSaga -> сontacts", сontacts)
      yield putResolve(actions.getContacts.success(сontacts))
      // yield put(push('/user'))
    } catch (error) {
      console.error("getContactsSaga -> error", error)
      yield put(actions.getContacts.failure(error.message))
    }
  }
}

const getContactsList = async () => {
  let сontactsContent = await dataPost('http://chat.fs.a-level.com.ua/graphql', 
    `Bearer ${localStorage.authToken}`,
    `query users {
      UserFind(query:"[{}]"){
        _id
        login
        nick
        createdAt
        avatar{
          _id, url
        }
      }
    }`
  )
  console.log(сontactsContent.data)
  return сontactsContent.data.UserFind
}