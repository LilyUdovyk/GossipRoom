import { take, call, put, putResolve } from 'redux-saga/effects';

import * as actions from './actions'
import { dataPost } from '../../dataPost'

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

const getContactsListQuery = `query users {
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

const getContactsList = async () => {
  let сontactsContent = await dataPost('http://chat.fs.a-level.com.ua/graphql', 
    `Bearer ${localStorage.authToken}`,
    getContactsListQuery
  )
  return сontactsContent.data.UserFind
}