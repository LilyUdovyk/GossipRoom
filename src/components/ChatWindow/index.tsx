import React from "react";
import Header from "../Header";

import "./ChatWindow.css";
import Chat from "../Chat";
import MessageInput from "../MessageInput";

interface Props {
  name: string,
}

const ChatWindow = (props: Props) => {
  return (
    <div className="ChatWindow">
      <Header userName = {props.name} />
      {/* <FunctionButtons /> */}
      <Chat />
      <MessageInput />
      {/* <MessageInput value = {typing}/> */}
    </div>
  );
};

export default React.memo(ChatWindow);