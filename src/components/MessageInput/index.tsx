import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { IRootAction, IRootState } from "../../store/rootReducer";
import * as messageActions from "../../store/message/actions";

import ButtonWithEmoji from "../ButtonWithEmoji"
import ButtonWithFileUpload from "../ButtonWithFileUpload"
import OriginalMessageBlock from "../OriginalMessageBlock"
import style from './style.module.css'

const mapStateToProps = (state: IRootState) => ({
  activeChatId: state.chat.activeChatId,
  originalMessage: state.message.savedMessage.originalMessage,
  isReply: state.message.savedMessage.isReply
});

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      sendMessage: messageActions.sendMessage.request,
      replyToMessage: messageActions.replyToMessage.request,
      saveOriginalMessage: messageActions.saveOriginalMessage,
    },
    dispatch
  );

type MessageInputProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const MessageInput: React.FC<MessageInputProps> = (props) => {
  const [text, setText] = React.useState("");

  const deleteOriginalMessage = () => {
    props.saveOriginalMessage(null, false, false)
  }

  const addEmoji = (emoji: any) => {
    console.log("input", emoji)
    setText(text + emoji.native)
  }

  const sendMessageHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (text.trim() === '') return;
    if (props.activeChatId && props.originalMessage) {
      props.replyToMessage({ activeChatId: props.activeChatId, text, originalMessageId: props.originalMessage._id })
    } else if (props.activeChatId) {
      props.sendMessage({ activeChatId: props.activeChatId, text, mediaId: null })
    }
    setText("")
  }

  return (
    <>
      {/* { props.isReply &&
        <OriginalMessageBlock 
          originalMessage={props.originalMessage}
          deleteOriginalMessage={deleteOriginalMessage}
        />
      } */}
      <form action="" onSubmit={sendMessageHandler} className={style.message}>
        <input
          className={style.messageInput}
          placeholder="Write your message"
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <ButtonWithEmoji addEmoji={addEmoji} />
        <div className={style.buttonBlock}>
          <ButtonWithFileUpload />
          <button type="submit" className={style.button} >
            <FontAwesomeIcon icon="paper-plane" />
          </button>
        </div>
      </form>
    </>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(MessageInput));