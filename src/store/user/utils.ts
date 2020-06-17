import { dataPost } from '../../services/api'

export const userQuery = 
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

const updateUserQuery = `mutation settings ($user_id: ID, $image_id: ID, $nick:String, $login:String, $password:String) {
  UserUpsert(user: {_id: $user_id, 
    nick: $nick, 
    login: $login,
    password: $password
    avatar: {_id: $image_id}}) ${userQuery}
}`
  
export const updateUser = async (userId: string, imageId: string, nick: string, login: string, password: string) => {
  let updateUserContent = await dataPost(
    `Bearer ${localStorage.authToken}`,
    updateUserQuery,
    {
        "user_id": userId,
        "image_id": imageId,
        "nick": nick,
        "login": login,
        "password": password
    }  
  )
  return updateUserContent.data.UserUpsert
}