import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
// import { push } from "connected-react-router";
import io from 'socket.io-client';

import { IRootAction } from "../../store/rootReducer";
import * as userAction from "../../store/user/actions";
import * as messageAction from "../../store/message/actions";

import style from './style.module.css'
import Sidebar from '../Sidebar';
import Main from "../Main";

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      getUser: userAction.getUser.request,
      onMessage: messageAction.onMessage
      // pushRouter: push
    },
    dispatch
  );

type ProfileProps = ReturnType<typeof mapDispatchToProps>;

const Profile: React.FC<ProfileProps> = props => {
  React.useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      return
    }
    props.getUser()

    const socket = io('http://chat.fs.a-level.com.ua/');
    socket.emit('jwt', localStorage.authToken)
    socket.on('jwt_ok',   (data: any) => console.log(data))
    socket.on('jwt_fail', (error: any) => console.log(error))
    socket.on('msg', (message: any) => {
      props.onMessage(message)
    })
  },[])

  return (
    <div className={style.profile}>
      <Sidebar />
      <Main />
    </div>
  );
};

export default connect( null, mapDispatchToProps)(React.memo(Profile));