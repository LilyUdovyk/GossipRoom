import React from "react";
// import store from "../store";
// import _ from "lodash";
import Header from "../Header";
// import Chats from "../components/Chats";
// import MessageInput from "./MessageInput";
// import FunctionButtons from "./FunctionButtons"
import "./ChatWindow.css";

interface Props {
  name: string,
}

const ChatWindow = (props: Props) => {
	// const state = store.getState();
  // const {typing} = state;
	// const activeUser = state.contacts[activeUserId];
	// const activeMsgs = state.messages[activeUserId];

  return (
    <div className="ChatWindow">
    <Header userName = {props.name}/>
    {/* <FunctionButtons />
    <Chats activeUser = {activeUserId} messages = {_.values(activeMsgs).filter(m=>{return m.text.length!==0})}/>
    <MessageInput value = {typing}/> */}
    </div>
  );
};

export default React.memo(ChatWindow);