import React from "react";
import Header from "../Header";

import Chat from "../Chat";
import MessageInput from "../MessageInput";
import style from './style.module.css'

interface Props {
  name: string,
}

const ChatWindow = (props: Props) => {
  return (
    <div className={style.chatWindow}>
      <Header activeChatName = {props.name} />
      <Chat />
      <MessageInput />
    </div>
  );
};

export default React.memo(ChatWindow);