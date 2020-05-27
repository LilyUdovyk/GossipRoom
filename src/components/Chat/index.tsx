import React, {useRef} from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import moment from 'moment';
// import ScrollToBottom, { useScrollToBottom, useSticky } from 'react-scroll-to-bottom';

import { IRootState, IRootAction } from "../../store/rootReducer";
import * as messageActions from "../../store/message/actions";
import { MessageData } from "../../store/chat/types";
import FormattedMessage from "../FormattedMessage"
import ForwardBlock from "../ForwardBlock"
import "./Chat.css";

const mapStateToProps = (state: IRootState) => ({
  activeUserId: state.user.userData._id,
  nick: state.user.userData.nick,
  activeChat: state.chat.chatData,
  activeChatName: state.chat.activeChatName,
  messages: state.chat.chatData ? state.chat.chatData.messages : [],
  media: state.message.messageData.media,
  mediaUrl: state.media.fileData.url,
  originalMessage: state.message.savedMessage.originalMessage,
  isForward: state.message.savedMessage.isForward
});

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      saveOriginalMessage: messageActions.saveOriginalMessage,
    },
    dispatch
  );

type ChatProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const Chat: React.FC<ChatProps> = props => {  

  const chatsRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
		scrollToBottom();
  }, [])
  
  React.useEffect(() => {
		scrollToBottom();
	}, [props.messages])

  const scrollToBottom = () => {
    if (chatsRef.current) {
      chatsRef.current.scrollTop = chatsRef.current.scrollHeight;
    }
  }

  const isUserMsg = (message: MessageData) => {
    // console.log(props.messages.message.owner._id, props.activeUserId, props.activeUserId === props.messages.message.owner._id)
    return message.owner._id === props.activeUserId ? true : false
  }

  const replyMessage = (message: MessageData) => {
    console.log("replyOriginalMessage", message)
    props.saveOriginalMessage(message, true, false)
  }

  const forwardMessage = (message: MessageData) => {
    console.log("saveOriginalMessage", message)
    props.saveOriginalMessage(message, false, true)
    console.log("isForward", props.isForward)
    console.log("saveOriginalMessage", props.originalMessage)
  }

  return (
    <div className="Chats" ref={chatsRef}>
      { props.messages && props.messages.map((message: MessageData) => (
        <div 
          key={message._id}
          className={`"Message_input_box" Chat ${isUserMsg(message) ? "is-user-msg" : ""}`}
          // onClick = { () => replyToMessage(message) }
          onClick = { () => forwardMessage(message) }
          // onMouseDown = {handleMouseDown}
          // onMouseUp = {handleMouseUp}
          // data-active = {activeUser}
          data-name={isUserMsg(message) ? "You " : props.activeChatName}
          data-user={isUserMsg(message)}
          data-text={message.text}
          data-number={message._id}
        >
          { message.replyTo &&
            <div className="replyBlock">
              <p className="owner">
                { message.replyTo.owner.nick || message.replyTo.owner.login }
              </p>
                <FormattedMessage message={message.replyTo} />
            </div>
          }
          { message.forwarded &&
            <div className="forwardedBlock">
              <p className="owner">
                Forwarded from { message.forwarded.owner.nick || message.forwarded.owner.login }
              </p>
              <FormattedMessage message={message.forwarded} />
            </div>
          } 
          <FormattedMessage message={message} />
          <time className="timeBlock">{moment(+message.createdAt).format('HH:mm')}</time>
        </div>
      ))}
      { props.isForward &&
        <ForwardBlock />
      }
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);