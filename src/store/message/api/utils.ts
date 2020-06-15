export const messageQuery = 
`{
  _id
  createdAt
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
    originalFileName
    type
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
      originalFileName
      type
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
      originalFileName
      type
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
      originalFileName
      type
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
      originalFileName
      type
    }
  }
}`