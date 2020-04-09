import React, { Component } from "react";
import "./Messages.css";
// import store from "../store";
// import {setEditMessage,deleteMessage,showOptions} from "../actions";

// const Chat = ({ message,activeUser }) => {
//   const { text, is_user_msg, containReply, number} = message;
//   return (
//     <div 
//     className={`"Message_input_box" Chat ${is_user_msg ? "is-user-msg" : ""}`}
//     onClick = {is_user_msg ? handleUserMessageEdit:handleContactMessageEdit}
//     onMouseDown = {handleMouseDown}
//     onMouseUp = {handleMouseUp}
//     data-name = {is_user_msg ? "You":store.getState().contacts[activeUser].name}
//     data-active = {activeUser}
//     data-user = {is_user_msg}
//     data-text = {text} 
//     data-number = {number}  
//     >
//      <div
//     className={`C_Message_reply Chat ${ containReply ? "show-reply":""} ${is_user_msg ? "is-user-msg" : ""}`}>
//      <p className = "Message_reply_name">{store.getState().chatBoxContainReply[2]}</p>
//      {store.getState().chatBoxContainReply[1].substring(0,70)}
// </div>
// {text}
//     <button 
//     data-active = {activeUser} 
//     data-number = {number} 
//     onClick = {handleDeleteMessage} 
//     className ="Chat_delete_button">
//     x
//     </button>
//      </div>
//   );
// };
// var timer;
// const handleMouseDown = (event)=>{
// let active = event.target.dataset.active;
// let text = event.target.dataset.text;
// let name = event.target.dataset.name;
// event.preventDefault();

// timer = setTimeout(()=>{store.dispatch(showOptions(true,active,text,name))},500);
// }
// const handleMouseUp = (event)=>{
// clearTimeout(timer);
// }

// const handleDeleteMessage = (event)=>{
// event.stopPropagation();
// const number = event.target.dataset.number;
// const active = event.target.dataset.active;
// console.log("delete")
// store.dispatch(deleteMessage(number,active))
// }

// const handleContactMessageEdit = ()=> {};
// const handleUserMessageEdit = (event) =>{
//   event.stopPropagation();
//   const messageToEdit = event.target.dataset.text;
//   const number = event.target.dataset.number;
//   const activeUser = event.target.dataset.active;
//   store.dispatch(setEditMessage(messageToEdit,activeUser,number));
// }

class Messages extends Component {
  // constructor(props){
  //   super(props);
  //   this.chatsRef = React.createRef();
  // }
  // scrollToBottom = () => {
  //   this.chatsRef.current.scrollTop = this.chatsRef.current.scrollHeight;
  // };

  // componentDidMount() {
  //   this.scrollToBottom();
  // }

  // componentDidUpdate() {
  //   this.scrollToBottom();
  // }
  render() {
    return (
      <div className="Chats" 
        // ref = {this.chatsRef}
      >
        {/* {this.props.messages.map(message => (
          <Chat activeUser = {this.props.activeUser} message={message} key={message.number}/>
        ))} */}
      </div>
    );
  }
}

export default React.memo(Messages);