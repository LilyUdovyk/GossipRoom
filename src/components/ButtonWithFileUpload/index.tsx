import React from 'react'
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { IRootAction, IRootState } from "../../store/rootReducer";
import * as messageActions from "../../store/message/actions";
import * as mediaAction from "../../store/media/actions";

import style from './style.module.css'

const mapStateToProps = (state: IRootState) => ({
  activeChatId: state.chat.activeChatId,
  fileId: state.media.fileData._id
});

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      uploadFile: mediaAction.uploadFile.request,
      sendMessage: messageActions.sendMessage.request
    },
    dispatch
  );

type ButtonWithFileUploadProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

interface State {
  isOpenedFileUpload: boolean,
  fileMessage: string
}

class ButtonWithFileUpload extends React.PureComponent<ButtonWithFileUploadProps> {

  state = {
    isOpenedFileUpload: false,
    fileMessage: ""
  }

  myRef = React.createRef<HTMLDivElement>()
  myFormRef = React.createRef<HTMLFormElement>()
  fileAttachmentRef = React.createRef<HTMLInputElement>();

  closeFileUpload = (event: any) => {
    if (this.myRef.current && !(this.myRef.current.contains(event.target))) {
      this.setState({
        isOpenedFileUpload: false
      })
    }
  };

  componentDidUpdate(prevProps: {}, prevState: State) {
    if (prevState.isOpenedFileUpload === this.state.isOpenedFileUpload) {
      return;
    }
    if (this.state.isOpenedFileUpload) {
      document.addEventListener("click", this.closeFileUpload);
    } else {
      document.removeEventListener("click", this.closeFileUpload);
    }
  }

  toggleFileUpload = () => {
    this.setState({
      isOpenedFileUpload: !this.state.isOpenedFileUpload
    })
  }

  uploadFile = (form: any) => {
    this.props.uploadFile(form)
  }

  sendAttachment = (e: React.FormEvent<HTMLFormElement>) => {
    const { fileMessage } = this.state;

    if (this.props.activeChatId) {
      this.props.sendMessage({
        activeChatId: this.props.activeChatId,
        text: fileMessage,
        mediaId: this.props.fileId
      })      
    }

    this.setState({
      isOpenedFileUpload: false,
      fileMessage: '',
    });
  }

  render() {
    const { isOpenedFileUpload, fileMessage } = this.state;
    return (
      <div className={style.buttonWithFileUpload}>
        <button onClick={this.toggleFileUpload}>
          <FontAwesomeIcon icon="paperclip" />
        </button>
        { isOpenedFileUpload &&
          <div ref={this.myRef} className={style.dialogContainer}>
            <div className={style.dialog}>
              <header className={style.dialogHeader}>
                <h4>Upload a file</h4>
                <button onClick={() => this.setState({ isOpenedFileUpload: false })}>
                  X
                </button>
              </header>
              <form
                className={style.dialogForm}
                ref={this.myFormRef}
                method="post"
                action='/upload'
                encType="multipart/form-data"
                id="form"
                onSubmit={this.sendAttachment}
              >
                <input
                  type="file"
                  name="media"
                  id="media"
                  ref={this.fileAttachmentRef}
                  onChange={() => { if (this.myFormRef.current) this.uploadFile(this.myFormRef.current) }}
                />
                <label className={style.dialogLabel} htmlFor="new-message">
                  Add a message about the file
              </label>
                <input
                  id="new-message"
                  className={style.dialogInput}
                  autoFocus
                  type="text"
                  name="fileMessage"
                  value={fileMessage}
                  onChange={(e) => this.setState({ fileMessage: e.target.value })}
                  placeholder="Enter your message"
                />
                <button type="submit" className={style.submitBtn}>
                  Upload
              </button>
              </form>
            </div>
          </div>
        }
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ButtonWithFileUpload);