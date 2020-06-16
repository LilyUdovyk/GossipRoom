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
  activeChatId: state.chat.chatSuccessData.activeChat._id,
  originalMessage: state.message.savedMessage.originalMessage,
  isReply: state.message.savedMessage.isReply,
  isForward: state.message.savedMessage.isForward
});

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      sendMessage: messageActions.sendMessage.request,
      replyToMessage: messageActions.replyToMessage.request,
      forwardMessage: messageActions.forwardMessage.request,
      saveOriginalMessage: messageActions.saveOriginalMessage,
    },
    dispatch
  );

type MessageInputProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const MessageInput: React.FC<MessageInputProps> = (props) => {
  const [text, setText] = React.useState("");

  const deleteOriginalMessage = () => {
    props.saveOriginalMessage({originalMessage: null, isReply: false, isForward: false})
  }

  const addEmoji = (emoji: any) => {
    setText(text + emoji.native)
  }

  const sendMessageHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (text.trim() === '') return;
    if (props.activeChatId && props.originalMessage && props.isReply) {
      props.replyToMessage({ activeChatId: props.activeChatId, text, originalMessageId: props.originalMessage._id })
    } else if (props.activeChatId) {
      props.sendMessage({ activeChatId: props.activeChatId, text, mediaId: null })
    }
    setText("")
  }

  return (
    <>
      { props.isReply &&
        <OriginalMessageBlock 
          originalMessage={props.originalMessage}
          deleteOriginalMessage={deleteOriginalMessage}
        />
      }
      <div className={style.messageBlock}>
        <ButtonWithEmoji addEmoji={addEmoji} />
        <form action="" onSubmit={sendMessageHandler} className={style.messageForm}>
          <input
            className={style.messageInput}
            placeholder="Write your message"
            type="text"
            autoFocus={true}
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <div className={style.buttonBlock}>
            <button type="submit" className={style.button} >
              <FontAwesomeIcon icon="paper-plane" />
            </button>
            <ButtonWithFileUpload />
          </div>
        </form>
      </div>
    </>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(MessageInput));