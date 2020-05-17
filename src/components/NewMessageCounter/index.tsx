import React from "react";

import { MessageData } from '../../store/message/types'
import style from "./style.module.css"

interface Props {
  chat_id?: string,
  newMessage?: MessageData,
  activeChatId?: string | null;
}

const NewMessageCounter = (props: Props) => {
  const [counter, setCounter] = React.useState(0)

  let chatIdWithNewMessage = props.newMessage ? props.newMessage.chat._id : null
  
  React.useEffect(() => {
		const authToken = localStorage.getItem('authToken')
		if (!authToken) {
			return
    }
		if (props.newMessage && chatIdWithNewMessage === props.chat_id && props.chat_id !== props.activeChatId) {
      setCounter(counter + 1)
      console.log("newMessage[]", counter)
		}
  }, [])
  
  React.useEffect(() => {
    if (props.newMessage && chatIdWithNewMessage === props.chat_id && props.chat_id !== props.activeChatId) {
      console.log("chatIdWithNewMessage", chatIdWithNewMessage)
    //   console.log("newMessageBefore", counter)
      setCounter(counter + 1)
      console.log("newMessage", counter)
	}
  }, [props.newMessage])

  return (  
    <div className={style.counter}>
      {counter}
    </div>
  );
};
export default React.memo(NewMessageCounter);