import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom"

import { IRootAction, IRootState } from "../../store/rootReducer";
import * as chatActions from "../../store/chat/actions";
import { UserData } from '../../store/user/types'

import style from './style.module.css'
import User from "../User";
import userAvatar from '../../img/user_avatar.png'

const mapStateToProps = (state: IRootState) =>
 ({
  activeUser: state.user.userData,
  contacts: state.contacts.contactsData,
  chatAvatar: state.chat.chatData.avatar ? `http://chat.fs.a-level.com.ua/${state.chat.chatData.avatar.url}` : userAvatar,
  imageId: state.media.fileData._id,
  imageUrl: `http://chat.fs.a-level.com.ua/${state.media.fileData.url}`
});

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      getActiveChat: chatActions.getActiveChat.request,
      addGroup: chatActions.addGroup.request
    },
    dispatch
  );

type CreationNewChatProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const CreationNewChat: React.FC<CreationNewChatProps> = props => {
  let defaultMembers = [props.activeUser]

  const [chatTitle, setChatTitle] = React.useState("");
  const [members, setMembers] = React.useState(defaultMembers);

  const myFormRef = React.useRef<HTMLFormElement>(null)

  const addMemberHandler = (contact: UserData) => {
    if (!members.includes(contact)) {
      setMembers([...members, contact])
    }
  }

  const addGroupHandler = () => {
    props.addGroup({ chatTitle, members })
  }

  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.header}>
          <h2>Create New Chat</h2>
        </div>
        <div className={style.main}> 
          <form className={style.form}
            ref={myFormRef}
            method="post"
            action='/upload'
            encType="multipart/form-data"
            id="form"
          >
            <label htmlFor="title">Group name</label>
            <input
              className={style.titleInput}
              type="text"
              id="title"
              value={chatTitle}
              onChange={(e) => setChatTitle(e.target.value)}
            />
          </form>
          <h4>Add members</h4>
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
        <div className={style.buttonBlock}>
          <button onClick={addGroupHandler}>
            Create
          </button>
          <button>
            <Link to="/profile">Cancel</Link>
          </button>
        </div>
      </div>
    </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(CreationNewChat));