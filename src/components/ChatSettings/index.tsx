import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom"

import { IRootAction, IRootState } from "../../store/rootReducer";
import * as chatActions from "../../store/chat/actions";

import style from './style.module.css'

const mapStateToProps = (state: IRootState) =>
 ({
  activeChat: state.chat.chatSuccessData.activeChat,
  activeChatName: state.chat.chatSuccessData.activeChatName,
});

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      updateChat: chatActions.updateChat.request,
    },
    dispatch
  );

type ChatSettingsProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const ChatSettings: React.FC<ChatSettingsProps> = props => {
  const [newTitle, setNewTitle] = React.useState(props.activeChatName);

  const settingsHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    props.updateChat({ chatId: props.activeChat._id, title: newTitle })
  }

  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.header}>
          <h2>Chat's Settings</h2>
        </div>
        <form action="" onSubmit={settingsHandler} id="form" className={style.form}>
          <div className={style.formControl}>
            <label htmlFor="title">Change title</label>
            <input
              type="text"
              id="title"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
            />
          </div>
          <div className={style.buttonBlock}>
            <button type="submit" className={style.submitBtn}>Save</button>
            <button className={style.submitBtn}>
              <Link to={process.env.PUBLIC_URL + '/profile'}>Cancel</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ChatSettings));