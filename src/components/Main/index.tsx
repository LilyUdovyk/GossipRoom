import React from 'react';
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";

import { IRootAction, IRootState } from "../../store/rootReducer";
import * as UserActions from "../../store/user/actions";
import { push } from "connected-react-router";

import './Main.css';
import Empty from "../Empty";
import ChatWindow from "../ChatWindow";
import userAvatar from '../../img/user_avatar.png'

const mapStateToProps = (state: IRootState) => ({
  nick: state.user.userData.nick,
  avatar: state.user.userData.avatar ? `http://chat.fs.a-level.com.ua/${state.user.userData.avatar.url}` : userAvatar 
});

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      userById: UserActions.getUser.request,
      // pushRouter: push
    },
    dispatch
  );

type MainProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const Main: React.FC<MainProps> = props => { 
  return (
    <main className="Main">
      {/* <Empty 
        name={props.nick ? props.nick : ''}
        avatarSrc={props.avatar ? props.avatar : ''} 
      /> */}
      <ChatWindow name={props.nick ? props.nick : ''} />;
    </main>
  )
    
	// const renderMainContent = () => {
  //   if (!activeUserId) {
  //     return <Empty user={user} activeUserId={activeUserId} />;
  //   } else {
  //     return <ChatWindow activeUserId={activeUserId} />;
  //   }
 	//  };
	// return <main className = "Main">{renderMainContent()}</main>
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Main));
