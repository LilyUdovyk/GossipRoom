import React from 'react'
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { IRootAction, IRootState } from "../../store/rootReducer";
import * as messageActions from "../../store/message/actions";

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
  fileAttachmentRef = React.createRef<HTMLInputElement>();

  closeFileUpload = (event: any) => {
    console.log(this.myRef)
    if (this.myRef.current && !(this.myRef.current.contains(event.target))) {
      console.log("TCL: Button -> closeSmiles -> event", event)
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
      console.log("addEventListener", prevState);
      document.addEventListener("click", this.closeFileUpload);
    } else {
      console.log("removeEventListener");
      document.removeEventListener("click", this.closeFileUpload);
    }
  }

  toggleFileUpload = () => {
    this.setState({
      isOpenedFileUpload: !this.state.isOpenedFileUpload
    })
  }

  uploadAttachment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { fileMessage } = this.state;
      const file = this.fileAttachmentRef.current && this.fileAttachmentRef.current.files && this.fileAttachmentRef.current.files[0]

    if (this.props.activeChatId) {
      this.props.sendMessage({
        activeChatId: this.props.activeChatId,
        text: fileMessage
      })
    }

      // .sendMessage({
      //   text: fileMessage || file.name,
      //   roomId: currentRoom.id,
      //   attachment: {
      //     file,
      //     name: file.name,
      //   },
      // })


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
        {isOpenedFileUpload &&
          <div className={style.dialogContainer}>
            <div className={style.dialog}>
              <header className={style.dialogHeader}>
                <h4>Upload a file</h4>
                <button onClick={() => this.setState({isOpenedFileUpload: false})}>
                  X
                </button>
              </header>
              <form className={style.dialogForm} onSubmit={this.uploadAttachment}>
                <input
                  type="file"
                  ref={this.fileAttachmentRef}
                  accept="image/png, image/jpeg"
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
                  onChange={(e) => this.setState({fileMessage: e.target.value})}
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