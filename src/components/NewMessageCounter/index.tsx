import React from "react";

import style from "./style.module.css"

interface Props {
  chatId?: string,
  newMessageId?: string | null,
  newMessageChatId?: string | null,
  activeChatId?: string | null,
}

const NewMessageCounter = (props: Props) => {
  const [counter, setCounter] = React.useState(0)

  React.useEffect(() => {
    if (props.newMessageId && (props.newMessageChatId === props.chatId)) {
      setCounter(counter + 1)
    }
  }, [props.newMessageId])

  React.useEffect(() => {
    if (props.chatId === props.activeChatId) {
      setCounter(0)
    }
  }, [props.activeChatId])


  return (  
    <>
      { counter > 0 && (props.newMessageChatId !== props.activeChatId) && 
        <div className={style.counter}>
          {counter}
        </div>
      }
    </>
  )
}
export default React.memo(NewMessageCounter);