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
import chatAvatar from '../../img/chat_avatar.jpg'

const mapStateToProps = (state: IRootState) => ({
  chats: state.user.userData.chats,
  activeUserId: state.user.userData._id,
  originalMessage: state.message.savedMessage.originalMessage,
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

type ForwardingBlockProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const ForwardingBlock: React.FC<ForwardingBlockProps> = props => {

  const myRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
		if (props.isForward) {
      document.addEventListener("click", closeForwardBlock);
    } else {
      document.removeEventListener("click", closeForwardBlock);
    }
  }, [props.isForward])
  
  const closeForwardBlock = (event: any) => {
    if (myRef.current && !(myRef.current.contains(event.target))) {
      deleteOriginalMessage()
    }
  };

  const deleteOriginalMessage = () => {
    props.saveOriginalMessage({originalMessage: null, isReply: false, isForward: false})
  }

  const forwardMessage = (chatId: string) => {
    props.getActiveChat(chatId)
    if (props.originalMessage){
      props.forwardMessage({ activeChatId: chatId, originalMessageId: props.originalMessage._id })
    }
  }

  const getDetailsOfChat = (chat: ChatData) => {
		if (chat.members.length === 1) {
			let details = {
				name: "You",
				avatar: chat.avatar ? `http://chat.fs.a-level.com.ua/${chat.avatar.url}` : userAvatar
			}
			return details
		} else if (chat.members.length > 2) {
			let details = {
				name: chat.title || "Group",
				avatar: chat.avatar ? `http://chat.fs.a-level.com.ua/${chat.avatar.url}` : chatAvatar
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

  return (
    <div ref={myRef} className={style.forwardingContainer}>
      <header className={style.containerHeader}>
        <h4 className={style.containerTitle}>Choose recipient</h4>
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
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ForwardingBlock));