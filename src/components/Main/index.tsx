import React from 'react';
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

import { IRootAction, IRootState } from "../../store/rootReducer";
import * as userActions from "../../store/user/actions";

import style from './style.module.css'
import Empty from "../Empty";
import ChatWindow from "../ChatWindow";
import userAvatar from '../../img/user_avatar.png'

const mapStateToProps = (state: IRootState) => ({
  nick: state.user.userData.nick,
  login: state.user.userData.login,
  avatar: state.user.userData.avatar ? `http://chat.fs.a-level.com.ua/${state.user.userData.avatar.url}` : userAvatar,
  activeChatId: state.chat.chatData._id,
  activeChatName: state.chat.activeChatName
});

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      getUser: userActions.getUser.request,
    },
    dispatch
  );

type MainProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const Main: React.FC<MainProps> = props => {

  const renderMainPageContent = () => {
    if (!props.activeChatId) {
      return (
        <Empty 
          name={props.nick || props.login}
          avatarSrc={props.avatar} 
        />
      )
    }  else {
      return (
        <ChatWindow name={props.activeChatName} />
      )
    }
  }

  return (
    <main className={style.main}>
      {renderMainPageContent()}
    </main>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Main));
