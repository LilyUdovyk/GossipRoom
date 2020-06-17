import { dataPost } from '../../services/api'

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
  
export const getContactsList = async () => {
    let сontactsContent = await dataPost(
      `Bearer ${localStorage.authToken}`,
      getContactsListQuery
    )
    return сontactsContent.data.UserFind
}