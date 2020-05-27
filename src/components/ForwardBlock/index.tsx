import React from 'react'
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { IRootAction, IRootState } from "../../store/rootReducer";
import * as chatActions from "../../store/chat/actions";
import * as messageActions from "../../store/message/actions";
import { ChatData } from '../../store/chat/types'

import style from './style.module.css'
import User from "../User";
import userAvatar from '../../img/user_avatar.png'

const mapStateToProps = (state: IRootState) => ({
  chats: state.user.userData.chats,
  activeUserId: state.user.userData._id,
  isForward: state.message.savedMessage.isForward
});

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      getActiveChat: chatActions.getActiveChat.request,
      forwardMessage: messageActions.forwardMessage.request,
      saveOriginalMessage: messageActions.saveOriginalMessage,
    },
    dispatch
  );

type ForwardBlockProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const ForwardBlock: React.FC<ForwardBlockProps> = props => {

  const [isOpenedForwardBlock, setIsOpenedForwardBlock] = React.useState(props.isForward);

  const myRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
		if (isOpenedForwardBlock) {
      document.addEventListener("click", closeForwardBlock);
    } else {
      document.removeEventListener("click", closeForwardBlock);
    }
	}, [isOpenedForwardBlock])

  const closeForwardBlock = (event: any) => {
    if (myRef.current && !(myRef.current.contains(event.target))) {
      setIsOpenedForwardBlock(false)
    }
  };

  const getDetailsOfChat = (chat: ChatData) => {
		if (chat.members.length === 1) {
			let details = {
				name: "You",
				avatar: chat.avatar ? `http://chat.fs.a-level.com.ua/${chat.avatar.url}` : userAvatar
			}
			return details
		} else if (chat.members.length > 2) {
			let details = {
				// name: chat.title ? chat.title : "Group",
				name: chat.title || "Group",
				avatar: chat.avatar ? `http://chat.fs.a-level.com.ua/${chat.avatar.url}` : userAvatar
			}
			return details
		} else {
			let member = chat.members.find(member => {
				return member._id !== props.activeUserId
			})
			let memberAvatar = member && member.avatar && `http://chat.fs.a-level.com.ua/${member.avatar.url}`
			let details = {
				name: member && (member.nick || member.login),
				avatar: chat.avatar ? `http://chat.fs.a-level.com.ua/${chat.avatar.url}` : (memberAvatar || userAvatar)
			}
			return details
		}
  }
  
  const forwardMessage = (chatId: string) => {
    props.getActiveChat(chatId)
    props.forwardMessage(chatId)
  }

  const deleteOriginalMessage = () => {
    props.saveOriginalMessage(null, false, false)
  }

  return (
    <>
      { isOpenedForwardBlock &&
        <div ref={myRef} className={style.dialogContainer}>
          <header className={style.dialogHeader}>
            <h4>Choose recipient</h4>
            <button onClick={() => deleteOriginalMessage()}>
              <FontAwesomeIcon icon="times" />
            </button>
          </header>
          <div>
            { props.chats.map(chat => {
              return (
                <User
                  key={chat._id}
                  chat_id={chat._id}
                  name={getDetailsOfChat(chat).name}
                  avatarSrc={getDetailsOfChat(chat).avatar}
                  onClick={() => forwardMessage(chat._id)}
                />
              )
            })}
          </div>
        </div>
      }
    </>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(ForwardBlock);



// interface State {
//   isOpenedFileUpload: boolean,
//   fileMessage: string
// }

// class ButtonWithFileUpload extends React.PureComponent<ButtonWithFileUploadProps> {
//   state = {
//     isOpenedFileUpload: false,
//     fileMessage: ""
//   }

//   myRef = React.createRef<HTMLDivElement>()
//   myFormRef = React.createRef<HTMLFormElement>()
//   fileAttachmentRef = React.createRef<HTMLInputElement>();

//   closeFileUpload = (event: any) => {
//     if (this.myRef.current && !(this.myRef.current.contains(event.target))) {
//       this.setState({
//         isOpenedFileUpload: false
//       })
//     }
//   };

//   componentDidUpdate(prevProps: {}, prevState: State) {
//     if (prevState.isOpenedFileUpload === this.state.isOpenedFileUpload) {
//       return;
//     }
//     if (this.state.isOpenedFileUpload) {
//       document.addEventListener("click", this.closeFileUpload);
//     } else {
//       document.removeEventListener("click", this.closeFileUpload);
//     }
//   }

//   toggleFileUpload = () => {
//     this.setState({
//       isOpenedFileUpload: !this.state.isOpenedFileUpload
//     })
//   }

//   uploadFile = (form: any) => {
//     this.props.uploadFile(form)
//   }

//   sendAttachment = (e: React.FormEvent<HTMLFormElement>) => {
//     const { fileMessage } = this.state;

//     if (this.props.activeChatId) {
//       this.props.sendMessage({
//         activeChatId: this.props.activeChatId,
//         text: fileMessage,
//         mediaId: this.props.fileId
//       })      
//     }

//     this.setState({
//       isOpenedFileUpload: false,
//       fileMessage: '',
//     });
//   }

//   render() {
//     const { isOpenedFileUpload, fileMessage } = this.state;
//     return (
//       <div className={style.buttonWithFileUpload}>
//         <button onClick={this.toggleFileUpload} className={style.paperclipButton} >
//           <FontAwesomeIcon icon="paperclip" />
//         </button>
//         { isOpenedFileUpload &&
//           <div ref={this.myRef} className={style.dialogContainer}>
//             <header className={style.dialogHeader}>
//               <h4>Upload a file</h4>
//               <button onClick={() => this.setState({ isOpenedFileUpload: false })}>
//                 <FontAwesomeIcon icon="times" />
//               </button>
//             </header>
//             <form
//               className={style.dialogForm}
//               ref={this.myFormRef}
//               method="post"
//               action='/upload'
//               encType="multipart/form-data"
//               id="form"
//               onSubmit={this.sendAttachment}
//             >            
//               <input
//                 type="file"
//                 name="media"
//                 id="media"
//                 ref={this.fileAttachmentRef}
//                 onChange={() => { if (this.myFormRef.current) this.uploadFile(this.myFormRef.current) }}
//               />
//               <label className={style.dialogLabel} htmlFor="new-message">
//                 Add a message about the file
//             </label>
//               <input
//                 id="new-message"
//                 className={style.dialogInput}
//                 autoFocus
//                 type="text"
//                 name="fileMessage"
//                 value={fileMessage}
//                 onChange={(e) => this.setState({ fileMessage: e.target.value })}
//                 placeholder="Write your message"
//               />
//               <button type="submit" className={style.submitBtn}>
//                 Upload
//             </button>
//             </form>
//           </div>
//         }
//       </div>
//     )
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(ButtonWithFileUpload);