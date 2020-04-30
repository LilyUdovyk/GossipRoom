import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { IRootAction, IRootState } from "../../store/rootReducer";
import * as messageActions from "../../store/message/actions";

import ButtonWithEmoji from "../ButtonWithEmoji"
import "./MessageInput.css";

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

const MessageInput: React.FC<MessageInputProps> = ({sendMessage, activeChatId}) => {
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
      <ButtonWithEmoji />
      <form action="" onSubmit={sendMessageHandler} className="Message">
        <div className="uploadBtnWrapper">
          <button className="button">
            <FontAwesomeIcon icon="paperclip" />
          </button>
          <input type="file" name="media" id="media" />
        </div>
        <div className="MessageInputBox">
          <input
            className="MessageInput"
            placeholder="write a message"
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </div>
        <button type="submit" className="button"> 
          <FontAwesomeIcon icon="paper-plane" />
        </button>
      </form>
    </>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(MessageInput));