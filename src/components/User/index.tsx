import React from "react";

import { MessageData } from '../../store/message/types'

import "./User.css";
import NewMessageCounter from "../NewMessageCounter"

interface Props {
  name: string | undefined,
  chat_id?: string,
  avatarSrc: string,
  newMessage?: MessageData,
  activeChatId?: string | null,
  onClick?: any
}

const User = (props: Props) => {
  // const [newMessageCounter, setNewMessageCounter] = React.useState(0)

  React.useEffect(() => {
		const authToken = localStorage.getItem('authToken')
		if (!authToken) {
			return
		}
		// if (props.chatIdWithNewMessage && props.chatIdWithNewMessage === props.chat_id && props.chat_id !== props.activeChatId) {
    //   setNewMessageCounter(newMessageCounter + 1)
    //   console.log("newMessage[]", newMessageCounter)
		// }
  }, [])
  
  // React.useEffect(() => {
  //   if (props.chatIdWithNewMessage && props.chatIdWithNewMessage === props.chat_id && props.chat_id !== props.activeChatId) {
  //     console.log("chatIdWithNewMessage", props.chatIdWithNewMessage)
  //     console.log("newMessageBefore", newMessageCounter)
  //     setNewMessageCounter(newMessageCounter + 1)
  //     console.log("newMessage", newMessageCounter)
	// 	}
  // }, [props.chatIdWithNewMessage])

  return (  
    <div className="user" onClick={props.onClick}>
      <img src={props.avatarSrc} alt="avatar" className="userImg" />
      <div className="userDetails">
        <p className="useDetailsName">{props.name}</p>
      </div >
      <NewMessageCounter
        chat_id={props.chat_id}
        newMessage={props.newMessage}
        activeChatId={props.activeChatId}
      />
    </div>
  );
};
export default React.memo(User);