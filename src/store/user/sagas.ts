import { take, call, put, putResolve, select } from 'redux-saga/effects';

import * as actions from './actions'
import { dataPost } from '../../dataPost'

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

const userQuery = 
`{
  _id
  login
  nick
  createdAt
  avatar{
    _id, url
  }
  chats{
    _id
    createdAt
    title
    owner{
      _id login nick
      avatar{
        _id, url
      }
    }
    members{
      _id login nick
      avatar{
        _id, url
      }
    }
    messages{
      _id createdAt text
      owner{
        _id login nick
        avatar{
          _id, url
        }
      }
    }
    avatar{
      _id, url
    }
  }
}`

const getActiveUserQuery = `query getUsers($activeUserQuery: String){
  UserFindOne(query: $activeUserQuery)
  ${userQuery}
}`

const getActiveUser = async (userId: string) => {
  const activeUserQuery = `[{"_id": "${userId}"}]`
  let userContent = await dataPost('http://chat.fs.a-level.com.ua/graphql', 
    `Bearer ${localStorage.authToken}`,
    getActiveUserQuery,
    {
      "activeUserQuery": activeUserQuery
    }
  )
  return userContent.data.UserFindOne
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

const updateAvatarQuery = `mutation updateAvatar($user_id: ID, $image_id: ID) {
  UserUpsert(user: {_id: $user_id, 
    avatar: {_id: $image_id}}) ${userQuery}
}`

const updateAvatar = async (user_id: string, image_id: string) => {
  let userContent = await dataPost('http://chat.fs.a-level.com.ua/graphql', 
    `Bearer ${localStorage.authToken}`,
    updateAvatarQuery,
    {
      "user_id": user_id,
      "image_id": image_id
    }
  )
  return userContent.data.UserUpsert
}