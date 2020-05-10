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

const getActiveUserQuery = `query getUsers($userQuery: String){
  UserFindOne(query: $userQuery){
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
  }
}`

const getActiveUser = async (userId: string) => {
  const userQuery = `[{"_id": "${userId}"}]`
  let userContent = await dataPost('http://chat.fs.a-level.com.ua/graphql', 
    `Bearer ${localStorage.authToken}`,
    getActiveUserQuery,
    {
      "userQuery": userQuery
    }
  )
  console.log(userContent.data)
  return userContent.data.UserFindOne
}

export function* updateAvatarSaga() {
  while (true) {
    const { payload } = yield take(actions.updateAvatar.request)
    console.log("updateAvatarSaga", payload)
    try {
      const userData = yield call(updateAvatar, payload.user_id, payload.image_id)
      console.log("updateAvatarSaga -> userData", userData)
      yield putResolve(actions.updateAvatar.success(userData))
    } catch (error) {
      console.error("updateAvatarSaga -> error", error)
      yield put(actions.updateAvatar.failure(error.message))
    }
  }
}

const updateAvatarQuery = `mutation updateAvatar($user_id: ID, $image_id: ID) {
  UserUpsert(user: {_id: $user_id, 
    avatar: {_id: $image_id}}) {
        _id
    login
    nick
    createdAt
    avatar {
      _id
      url
    }
    chats {
      _id
      createdAt
      owner {
        _id
        login
        nick
      }
      title
      members {
        _id
        login
        nick
      }
      messages {
        _id
        createdAt
        text
        owner {
          _id
          login
          nick
        }
      }
    }
  }
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
  console.log('userContent.data.UserUpsert', userContent.data.UserUpsert)
  return userContent.data.UserUpsert
}