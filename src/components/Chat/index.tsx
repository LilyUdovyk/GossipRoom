import React, { Component } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

import { IRootAction, IRootState } from "../../store/rootReducer";
import * as ChatActions from "../../store/chat/actions";
import { MessageData } from "../../store/chat/types";

import "./Chat.css";

const mapStateToProps = (state: IRootState) => ({
  messages: state.chat.chatData.messages
});

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      getActiveChat: ChatActions.getActiveChat.request,
    },
    dispatch
  );

type ChatProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

// type ChatProps = ReturnType<typeof mapDispatchToProps>;

// const Chat: React.FC<ChatProps> = props => { 
//   React.useEffect(() => {
//     const authToken = localStorage.getItem('authToken')
//     if (!authToken) {
//       return
//     }
//     props.getActiveChat()
//   },[])

//   return (
//     <div className="Chats">
//       {props.messages && props.messages.map((message: MessageData) => (
//         <div
//           key={message._id}
//           // className={`"Message_input_box" Chat ${is_user_msg ? "is-user-msg" : ""}`}
//           className="Chat is-user-msg"
//           // onClick = {is_user_msg ? handleUserMessageEdit:handleContactMessageEdit}
//           // onMouseDown = {handleMouseDown}
//           // onMouseUp = {handleMouseUp}
//           // data-name = {is_user_msg ? "You":store.getState().contacts[activeUser].name}
//           // data-active = {activeUser}
//           // data-user = {is_user_msg}
//           data-text = {message.text} 
//           data-number = {message._id}  
//         >
//           {/* <div
//             // className="{`C_Message_reply "Chat ${ containReply ? "show-reply":""} ${is_user_msg ? "is-user-msg" : ""}`}
//             className="Chat is-user-msg"
//           > */}
//             {/* <p className = "Message_reply_name"> */}
//               {/* {store.getState().chatBoxContainReply[2]} */}
//             {/* </p> */}
//             {/* {store.getState().chatBoxContainReply[1].substring(0,70)} */}
//           {/* </div> */}
//           {message.text}
//           <button 
//             // data-active = {activeUser} 
//             data-number = {message._id} 
//             // onClick = {handleDeleteMessage} 
//             className ="Chat_delete_button"
//           >x</button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Chat));

class Chat extends React.PureComponent<ChatProps> {
  constructor(props:ChatProps){
    super(props);
    this.chatsRef: React.RefObject <HTMLDivElement> = React.createRef()
    // this.chatsRef = React.createRef();
  }
  scrollToBottom = () => {
    this.chatsRef.current.scrollTop = this.chatsRef.current.scrollHeight;
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
  render() {
    return (
      <div className="Chats">
      {props.messages && props.messages.map((message: MessageData) => (
        <div
          key={message._id}
          // className={`"Message_input_box" Chat ${is_user_msg ? "is-user-msg" : ""}`}
          className="Chat is-user-msg"
          // onClick = {is_user_msg ? handleUserMessageEdit:handleContactMessageEdit}
          // onMouseDown = {handleMouseDown}
          // onMouseUp = {handleMouseUp}
          // data-name = {is_user_msg ? "You":store.getState().contacts[activeUser].name}
          // data-active = {activeUser}
          // data-user = {is_user_msg}
          data-text = {message.text} 
          data-number = {message._id}  
        >
          {/* <div
            // className="{`C_Message_reply "Chat ${ containReply ? "show-reply":""} ${is_user_msg ? "is-user-msg" : ""}`}
            className="Chat is-user-msg"
          > */}
            {/* <p className = "Message_reply_name"> */}
              {/* {store.getState().chatBoxContainReply[2]} */}
            {/* </p> */}
            {/* {store.getState().chatBoxContainReply[1].substring(0,70)} */}
          {/* </div> */}
          {message.text}
          <button 
            // data-active = {activeUser} 
            data-number = {message._id} 
            // onClick = {handleDeleteMessage} 
            className ="Chat_delete_button"
          >x</button>
        </div>
      ))}
    </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);