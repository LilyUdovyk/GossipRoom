import React from "react";

import { MessageData } from '../../store/message/types'
import style from "./style.module.css"

interface Props {
  chatId?: string,
  newMessage?: MessageData,
  activeChatId?: string | null,
}

const NewMessageCounter = (props: Props) => {
  const [counter, setCounter] = React.useState(0)

  let chatIdWithNewMessage = props.newMessage && props.newMessage.chat ? props.newMessage.chat._id : null
  
  React.useEffect(() => {
    if (props.newMessage && chatIdWithNewMessage === props.chatId && props.chatId !== props.activeChatId) {
      setCounter(counter + 1)
    }

    if (props.chatId === props.activeChatId) {
      setCounter(0)
    }
  }, [props.newMessage, props.activeChatId])

  return (  
    <>
      { counter > 0 && 
        <div className={style.counter}>
          {counter}
        </div>
      }
    </>
  );
};
export default React.memo(NewMessageCounter);