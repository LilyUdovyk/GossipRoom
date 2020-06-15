export const chatQuery = 
`{
  _id
  title
  createdAt
  owner {
    _id
    login
    nick
    avatar {
      _id
      url
    }
  }
  avatar {
    _id
    url
  }
  members {
    _id
    login
    nick
    avatar {
      _id
      url
    }
  }
  messages{
    _id
    text
    createdAt 
    owner{
      _id
      login
      nick
    }
    media{
      _id
      url
      type
      originalFileName
      text
    }
    replies {
      _id
      text
      owner {
        _id
        login
        nick
      }
      media{
        _id
        text
        url
        type
        originalFileName
      }
    }
    replyTo {
      _id
      text
      owner {
        _id
        login
        nick
      }
      media{
        _id
        text
        url
        type
        originalFileName
      }
    }
    forwarded {
      _id
      text
      owner {
        _id
        login
        nick
      }
      media{
        _id
        text
        url
        type
        originalFileName
      }
    }
    forwardWith {
      _id
      text
      owner {
        _id
        login
        nick
      }
      media{
        _id
        text
        url
        type
        originalFileName
      }
    }
  }
}`