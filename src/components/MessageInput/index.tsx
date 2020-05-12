import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { IRootAction, IRootState } from "../../store/rootReducer";
import * as messageActions from "../../store/message/actions";

import ButtonWithEmoji from "../ButtonWithEmoji"
import ButtonWithFileUpload from "../ButtonWithFileUpload"
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
  const [file, setFile] = React.useState(null);

  const addEmoji = (emoji: any) => {
    console.log("input", emoji)
    setText(text + emoji.native)
  }

  const sendMessageHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (text.trim() === '') return;
    if (activeChatId) {
      sendMessage({ activeChatId, text })
    }
    setText("")
  }

  // const uploadFile = (file: any) => {
  //   if (activeChatId) {
  //     sendMessage({ activeChatId, file })
  //   }
  //   setText("")
  // }

  return (
    <>
      <form action="" onSubmit={sendMessageHandler} className={style.message}>
        <input
          className={style.messageInput}
          placeholder="write a message"
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <ButtonWithEmoji addEmoji={addEmoji} />
        <div className={style.buttonBlock}>
          <ButtonWithFileUpload />
          {/* <div className={style.uploadBtnWrapper}> */}
            {/* <button 
              // onClick={(e) => uploadFile(e.target.files[0])}
            >
              <FontAwesomeIcon icon="paperclip" />
            </button> */}
            {/* <input 
              className={style.uploadInput}
              type="file"
              name="media"
              id="media"
              // files={file}
              // onChange={e => setFile(e.target.files[0])}
            /> */}
          {/* </div> */}
          <button type="submit">
            <FontAwesomeIcon icon="paper-plane" />
          </button>
        </div>
      </form>
    </>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(MessageInput));