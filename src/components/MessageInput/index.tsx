import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
// import { Link } from "react-router-dom"

import { IRootAction, IRootState } from "../../store/rootReducer";
import * as messageActions from "../../store/message/actions";

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

  const sendMessageHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (activeChatId) {
      sendMessage({ activeChatId, text })
    }
  }
  return (
    <form action="" onSubmit={sendMessageHandler} className="Message">
      <div className="MessageInputBox">
        <input
          className="MessageInput"
          placeholder="write a message"
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </div>
    </form>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(MessageInput));