import React from "react";
// import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import Iframe from 'react-iframe'

import { IRootState } from "../../store/rootReducer";
// import * as ChatActions from "../../store/chat/actions";
// import * as contactsAction from "../../store/contacts/actions";
import { MessageData } from "../../store/chat/types";

import "./Chat.css";

const mapStateToProps = (state: IRootState) => ({
	activeUserId: state.user.userData._id,
  nick: state.user.userData.nick,
  activeChat: state.chat.chatData,
  activeChatName: state.chat.activeChatName,
  messages: state.chat.chatData ? state.chat.chatData.messages : []
});

// const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
//   bindActionCreators(
//     {
//       getContacts: contactsAction.getContacts.request,
//     },
//     dispatch
//   );

// type ChatProps = ReturnType<typeof mapStateToProps> &
//   ReturnType<typeof mapDispatchToProps>;

// type ChatProps = ReturnType<typeof mapStateToProps>;

class Chat extends React.PureComponent<any> {

  chatsRef: React.RefObject <HTMLDivElement>

  constructor(props:any){
    super(props);
    this.chatsRef = React.createRef()
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    if (this.chatsRef.current) {
      this.chatsRef.current.scrollTop = this.chatsRef.current.scrollHeight;
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  isUserMsg(message: MessageData){
    // console.log(this.props.messages.message.owner._id, this.props.activeUserId, this.props.activeUserId === this.props.messages.message.owner._id)
    return message.owner._id === this.props.activeUserId ? true : false
  }

  getTime(milliseconds: number) {
    let formattedDate = new Date(milliseconds)
    let hours = this.getFormattedTime(formattedDate.getHours());
    let minutes = this.getFormattedTime(formattedDate.getMinutes());
    return `${hours}:${minutes}`
  }

  getFormattedTime(timeUnit: number) {
    return timeUnit < 10 ? `0${timeUnit}` : timeUnit;
  }

  getFormattedMessage (message: string) {
    let videoArray = message.match(/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌ [\w\?‌ =]*)?/)
    if (videoArray) {
      let videoId = videoArray && videoArray[1]
      return (
        <>
          <a href={message}>{message}</a>
          <Iframe 
            url={`https://www.youtube.com/embed/${videoId}`}
            width="100%"
            frameBorder={0}
            allow={"accelerometer"}
            allowFullScreen
            encrypted-media
            picture-in-picture
          />
        </>
      )
    } else {
      return  message
    }
  }

  render() {
    return (
      <div className="Chats" ref = {this.chatsRef}>
        {this.props.messages && this.props.messages.map((message: MessageData) => (
          <div
            key={message._id}
            className={`"Message_input_box" Chat ${this.isUserMsg(message) ? "is-user-msg" : ""}`}
            // onClick = {is_user_msg ? handleUserMessageEdit:handleContactMessageEdit}
            // onMouseDown = {handleMouseDown}
            // onMouseUp = {handleMouseUp}
            // data-active = {activeUser}
            data-name = {this.isUserMsg(message) ? "You ": this.props.activeChatName}
            data-user = {this.isUserMsg(message)}
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
            {this.getFormattedMessage(message.text)}
            <div className="timeBlock">{this.getTime(+message.createdAt)}</div>
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

export default connect(mapStateToProps, null)(Chat);