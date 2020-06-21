import React from 'react'
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { IRootAction, IRootState } from "../../store/rootReducer";
import * as messageActions from "../../store/message/actions";
import * as mediaActions from "../../store/media/actions";

import style from './style.module.css'

const mapStateToProps = (state: IRootState) => ({
  activeChatId: state.chat.chatSuccessData.activeChat._id,
  fileId: state.media.fileData._id
});

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      uploadFile: mediaActions.uploadFile.request,
      sendMessage: messageActions.sendMessage.request
    },
    dispatch
  );

type ButtonWithFileUploadProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const ButtonWithFileUpload: React.FC<ButtonWithFileUploadProps> = props => {

  const [isOpenedFileUpload, setIsOpenedFileUpload] = React.useState(false);
  const [fileMessage, setFileMessage] = React.useState('');

  const myRef = React.useRef<HTMLDivElement>(null);
  const myFormRef = React.useRef<HTMLFormElement>(null)
  const fileAttachmentRef = React.useRef<HTMLInputElement>(null);

  const closeFileUpload = React.useCallback(
    (event: MouseEvent) => {
      if (!(event.target instanceof Element)) {
        return;
      }
      if (myRef.current && !myRef.current.contains(event.target)) {
        setIsOpenedFileUpload(false);
      }
    },
    [setIsOpenedFileUpload]
  )

  React.useEffect(() => {
    if (isOpenedFileUpload) {
      document.addEventListener("click", closeFileUpload);
    } else {
      document.removeEventListener("click", closeFileUpload);
    }
  }, [isOpenedFileUpload])

  const toggleFileUpload = () => {
    setIsOpenedFileUpload(!isOpenedFileUpload)
  }

  const uploadFile = (form: HTMLFormElement) => {
    props.uploadFile(form)
  }

  const sendAttachment = (e: React.FormEvent<HTMLFormElement>) => {
    if (props.activeChatId) {
      props.sendMessage({
        activeChatId: props.activeChatId,
        text: fileMessage,
        mediaId: props.fileId
      })
    }
    setIsOpenedFileUpload(false)
    setFileMessage('')
  }

  return (
    <div className={style.buttonWithFileUpload}>
      <button onClick={toggleFileUpload} className={style.paperclipButton} >
        <FontAwesomeIcon icon="paperclip" />
      </button>
      {isOpenedFileUpload &&
        <div ref={myRef} className={style.dialogContainer}>
          <header className={style.dialogHeader}>
            <h4>Upload a file</h4>
            <button
              onClick={() => setIsOpenedFileUpload(false)}
            >
              <FontAwesomeIcon icon="times" />
            </button>
          </header>
          <form
            className={style.dialogForm}
            ref={myFormRef}
            method="post"
            action='/upload'
            encType="multipart/form-data"
            id="form"
            onSubmit={sendAttachment}
          >
            <input
              type="file"
              name="media"
              id="media"
              ref={fileAttachmentRef}
              onChange={() => { if (myFormRef.current) uploadFile(myFormRef.current) }}
            />
            <label className={style.dialogLabel} htmlFor="fileMessage">
              Add a message about the file
              </label>
            <input
              id="fileMessage"
              className={style.dialogInput}
              autoFocus
              type="text"
              name="fileMessage"
              value={fileMessage}
              onChange={(e) => setFileMessage(e.target.value)}
              placeholder="Write your message"
            />
            <button type="submit" className={style.submitBtn}>
              Upload
              </button>
          </form>
        </div>
      }
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ButtonWithFileUpload));
