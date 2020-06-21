import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { IRootAction, IRootState } from "../../store/rootReducer";
import * as authActions from "../../store/auth/actions";
import { ChatData } from '../../store/chat/types'

import style from './style.module.css'
import userAvatar from '../../img/user_avatar.png'
import chatAvatar from '../../img/chat_avatar.png'

const mapStateToProps = (state: IRootState) =>
 ({
  activeChat: state.chat.chatSuccessData.activeChat,
  activeChatName: state.chat.chatSuccessData.activeChatName,
  activeUserId: state.user.userData._id,
});

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      logout: authActions.logout,
    },
    dispatch
  );

type ButtonWithChatDetailsProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const  ButtonWithChatDetails: React.FC<ButtonWithChatDetailsProps> = props => {  

  const [isOpenedChatDetails, setIsOpenedChatDetails] = React.useState(false);

  const myRef = React.useRef<HTMLDivElement>(null);

  const closeChatDetails = React.useCallback(
    (event: MouseEvent) => {
      if (!(event.target instanceof Element)) {
        return;
      }
      if (myRef.current && !myRef.current.contains(event.target)) {
        setIsOpenedChatDetails(false);
      }
    },
    [setIsOpenedChatDetails]
  )

  React.useEffect(() => {
    if (isOpenedChatDetails) {
      document.addEventListener("click", closeChatDetails);
    } else {
      document.removeEventListener("click", closeChatDetails);
    }
  }, [isOpenedChatDetails])

  const toggleChatDetails = () => {
    setIsOpenedChatDetails(!isOpenedChatDetails)
  }

  const getAvatarOfChat = (chat: ChatData) => {
    let avatar
    if (chat.members.length === 1) {
        avatar = chat.avatar ? `http://chat.fs.a-level.com.ua/${chat.avatar.url}` : userAvatar
    } else if (chat.members.length > 2) {
        avatar = chat.avatar ? `http://chat.fs.a-level.com.ua/${chat.avatar.url}` : chatAvatar
    } else {
      let member = chat.members.find(member => {
        return member._id !== props.activeUserId
      })
      let memberAvatar = member && member.avatar && `http://chat.fs.a-level.com.ua/${member.avatar.url}`
        avatar = chat.avatar ? `http://chat.fs.a-level.com.ua/${chat.avatar.url}` : (memberAvatar || userAvatar)
    }
    return avatar
  }


  return (
    <div className={style.buttonWithChatDetails}>
      <button onClick={toggleChatDetails} className={style.navOpener}>
      <FontAwesomeIcon icon="comment-dots" />
      </button>
      {isOpenedChatDetails &&
        <div ref={myRef} className={style.chatDetails}>
          <div className={style.chatDetailsHeader}>
            <img src={getAvatarOfChat(props.activeChat)} />
            <p>{ props.activeChatName }</p>
          </div>
          <nav className={style.navSidebar}>
            <ul className={style.navList}>
              <li
                className={style.navItem}
              >
                <Link to="/chat-settings">
                  <FontAwesomeIcon icon="cogs" />
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      }
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ButtonWithChatDetails));