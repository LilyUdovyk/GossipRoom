import React from 'react'
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { IRootAction, IRootState } from "../../store/rootReducer";
import * as chatActions from "../../store/chat/actions";
import * as mediaActions from "../../store/media/actions";
import { UserData } from '../../store/user/types'

import style from './style.module.css'
import User from "../User";
import userAvatar from '../../img/user_avatar.png'
import chatAvatar from '../../img/chat_avatar.jpg'


const mapStateToProps = (state: IRootState) => ({
  // chats: state.user.userData.chats,
  // activeUserId: state.user.userData._id,
  activeUser: state.user.userData,
  contacts: state.contacts.contactsData,
  chatAvatar: state.chat.chatData.avatar ? `http://chat.fs.a-level.com.ua/${state.chat.chatData.avatar.url}` : chatAvatar,
  imageId: state.media.fileData._id,
  imageUrl: `http://chat.fs.a-level.com.ua/${state.media.fileData.url}`

});

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      uploadAvatar: mediaActions.uploadFile.request,
      getActiveChat: chatActions.getActiveChat.request,
    },
    dispatch
  );

type NewGroupBlockProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const NewGroupBlock: React.FC<NewGroupBlockProps> = props => {

  const [isOpenedNewGroupBlock, setIsOpenedNewGroupBlock] = React.useState(false);
  const [chatTitle, setChatTitle] = React.useState("");

  let members = [props.activeUser]

  const myRef = React.useRef<HTMLDivElement>(null);
  const myFormRef = React.useRef<HTMLFormElement>(null)
  
  React.useEffect(() => {
		if (isOpenedNewGroupBlock) {
      document.addEventListener("click", closeNewGroupBlock);
    } else {
      document.removeEventListener("click", closeNewGroupBlock);
    }
  }, [isOpenedNewGroupBlock, members.length])
  
  const openNewGroupBlock = () => {
    setIsOpenedNewGroupBlock(true)
  }

  const closeNewGroupBlock = (event: any) => {
    if (myRef.current && !(myRef.current.contains(event.target))) {
      setIsOpenedNewGroupBlock(false)
    }
  };

  const uploadAvatar = (form: HTMLFormElement) => {
    props.uploadAvatar(form)
  }

  const addMemberHandler = (contact: UserData) => {
    if (!members.includes(contact)) {
      console.log('push', members)
      members.push(contact)
    }
  }

  return (
    <div 
      className={style.li}
      onClick={() => openNewGroupBlock()}
    >
      <FontAwesomeIcon icon="comments" />
      New group
      { isOpenedNewGroupBlock &&
        <div ref={myRef} className={style.newGroupBlock}>
          <div className={style.newGroupBlockHeader}>
            <form className={style.uploadForm}
              ref={myFormRef}
              method="post"
              action='/upload'
              encType="multipart/form-data"
              id="form"
            >
              <div className={style.uploadBtnWrapper}>
                <button className={style.changeButton}>
                  <img src={props.imageId ? props.imageUrl : props.chatAvatar} />
                </button>
                <input
                  className={style.uploadInput}
                  type="file"
                  name="media"
                  id="media"
                  onChange={() => { if (myFormRef.current) uploadAvatar(myFormRef.current) }}
                />
              </div>
              <input
                className={style.titleInput}
                type="text"
                id="title"
                placeholder="Group name"
                value={chatTitle}
                onChange={(e) => setChatTitle(e.target.value)}
              />
            </form>
          </div>
          <div className={style.users}>
            <div className={style.contacts}>
              { props.contacts.map((contact: UserData) => {
                return (
                  <User 
                    key={contact._id}
                    name={contact.nick || contact.login}
                    avatarSrc={contact.avatar ? `http://chat.fs.a-level.com.ua/${contact.avatar.url}` : userAvatar }
                    onClick={() => addMemberHandler(contact)}
                  />
                )
              })}
            </div>
            <div className={style.members}>
              { members.map((member: UserData) => {
                return (
                  <User 
                    key={member._id}
                    name={member.nick || member.login}
                    avatarSrc={member.avatar ? `http://chat.fs.a-level.com.ua/${member.avatar.url}` : userAvatar }
                  />
                )
              })}
            </div>
          </div>
        </div>
      }
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(NewGroupBlock));