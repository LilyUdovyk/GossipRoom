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