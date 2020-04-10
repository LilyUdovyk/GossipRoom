import { take, call, put, putResolve, select } from 'redux-saga/effects';
// import { push } from 'connected-react-router';

import * as actions from './actions'
import { dataPost } from '../../dataPost'

export function* getUserSaga() {
  while (true) {
    yield take(actions.getUser.request)
    console.log("getUserSaga")
    try {
      const userId = yield select(state => state.auth.authData.id)
      const user = yield call(getActiveUser, userId)
      console.log("getUserSaga -> user", user)
      yield putResolve(actions.getUser.success(user))
      // yield put(push('/user'))
    } catch (error) {
      console.error("getUserSaga -> error", error)
      yield put(actions.getUser.failure(error.message))
    }
  }
}

const getActiveUser = async (userId: string) => {
  const userQuery = `[{"_id": "${userId}"}]`
  let userContent = await dataPost('http://chat.fs.a-level.com.ua/graphql', 
    `Bearer ${localStorage.authToken}`,
    `query getUsers($userQuery: String){
      UserFindOne(query: $userQuery){
        _id
        login
        nick
        createdAt
        avatar{
          _id, url
        }
      }
    }`,
    {
      "userQuery": userQuery
    }
  )
  console.log(userContent.data)
  return userContent.data.UserFindOne
}