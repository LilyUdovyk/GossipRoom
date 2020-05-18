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

  React.useEffect(() => {
		const authToken = localStorage.getItem('authToken')
		if (!authToken) {
			return
		}
  }, [])
  
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