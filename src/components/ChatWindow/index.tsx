import React from "react";
import Header from "../Header";
// import Messages from "../Chat";
import MessageInput from "../MessageInput";
import "./ChatWindow.css";
import Chat from "../Chat";

interface Props {
  name: string,
}

const ChatWindow = (props: Props) => {
  return (
    <div className="ChatWindow">
    <Header userName = {props.name} />
    {/* <FunctionButtons /> */}
    <Chat />
    {/* <Chats activeUser = {activeUserId} messages = {_.values(activeMsgs).filter(m=>{return m.text.length!==0})}/> */}
    <MessageInput />
    {/* <MessageInput value = {typing}/> */}
    </div>
  );
};

export default React.memo(ChatWindow);