import { dataPost } from '../../../services/api'
import { userQuery } from "./utils"

const getActiveUserQuery = `query getUsers($activeUserQuery: String){
  UserFindOne(query: $activeUserQuery)
  ${userQuery}
}`

export const getActiveUser = async (userId: string) => {
  const activeUserQuery = `[{"_id": "${userId}"}]`
  let userContent = await dataPost( 
    `Bearer ${localStorage.authToken}`,
    getActiveUserQuery,
    {
      "activeUserQuery": activeUserQuery
    }
  )
  return userContent.data.UserFindOne
}

const updateAvatarQuery = `mutation updateAvatar($user_id: ID, $image_id: ID) {
  UserUpsert(user: {_id: $user_id, 
    avatar: {_id: $image_id}}) ${userQuery}
}`

export const updateAvatar = async (user_id: string, image_id: string) => {
  let userContent = await dataPost(
    `Bearer ${localStorage.authToken}`,
    updateAvatarQuery,
    {
      "user_id": user_id,
      "image_id": image_id
    }
  )
  return userContent.data.UserUpsert
}

const updateUserQuery = `mutation settings ($user_id: ID, $image_id: ID, $nick:String, $login:String, $password:String) {
  UserUpsert(user: {_id: $user_id, 
    nick: $nick, 
    login: $login,
    password: $password
    avatar: {_id: $image_id}}) ${userQuery}
}`
  
export const updateUser = async (user_id: string, image_id: string, nick: string, login: string, password: string) => {
  let updateUserContent = await dataPost(
    `Bearer ${localStorage.authToken}`,
    updateUserQuery,
    {
        "user_id": user_id,
        "image_id": image_id,
        "nick": nick,
        "login": login,
        "password": password
    }  
  )
  return updateUserContent.data.UserUpsert
}