import React from "react";

import { MessageData } from '../../store/message/types'

import NewMessageCounter from "../NewMessageCounter"
import style from './style.module.css'

interface Props {
  name: string | undefined,
  chatId?: string,
  avatarSrc: string,
  newMessage?: MessageData,
  activeChatId?: string | null,
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const User = (props: Props) => {

  React.useEffect(() => {
		const authToken = localStorage.getItem('authToken')
		if (!authToken) {
			return
		}
  }, [])
  
  return (  
    <div className={style.user} onClick={props.onClick}>
      <img src={props.avatarSrc} alt="avatar" className={style.userImg} />
      <div className={style.userDetails}>
        <p className={style.useDetailsName}>{props.name}</p>
      </div >
      <NewMessageCounter
        chatId={props.chatId}
        newMessage={props.newMessage}
        activeChatId={props.activeChatId}
      />
    </div>
  );
};
export default React.memo(User);