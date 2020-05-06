import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { IRootAction, IRootState } from "../../store/rootReducer";
import * as messageActions from "../../store/message/actions";

import ButtonWithEmoji from "../ButtonWithEmoji"
import style from './style.module.css'

const mapStateToProps = (state: IRootState) => ({
  activeChatId: state.chat.activeChatId
});

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      sendMessage: messageActions.sendMessage.request
    },
    dispatch
  );

type MessageInputProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const MessageInput: React.FC<MessageInputProps> = ({ sendMessage, activeChatId }) => {
  const [text, setText] = React.useState("");
  const [smile, setSmile] = React.useState("");

  // const updateMessage = (value: string) => {
  //   setSmile(value)
  // }

  const sendMessageHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (activeChatId) {
      sendMessage({ activeChatId, text })
    }
    setText("")
  }

  return (
    <>
      <form action="" onSubmit={sendMessageHandler} className={style.message}>
        <input
          className={style.messageInput}
          placeholder="write a message"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <ButtonWithEmoji />
        <div className={style.buttonBlock}>
          <div className={style.uploadBtnWrapper}>
            <button>
              <FontAwesomeIcon icon="paperclip" />
            </button>
            <input className={style.uploadInput} type="file" name="media" id="media" />
          </div>
          <button type="submit">
            <FontAwesomeIcon icon="paper-plane" />
          </button>
        </div>
      </form>
    </>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(MessageInput));