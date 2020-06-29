import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import io from 'socket.io-client';

import { IRootAction } from "../../store/rootReducer";
import * as userActions from "../../store/user/actions";
import * as messageActions from "../../store/message/actions";
import { MessageData } from '../../store/message/types'
import { DecodedToken } from '../../store/auth/types'

import style from './style.module.css'
import Sidebar from '../Sidebar';
import Main from "../Main";

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      getUser: userActions.getUser.request,
      onMessage: messageActions.onMessage,
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
  
    const socket = io('http://chat.fs.a-level.com.ua/');
    socket.emit('jwt', localStorage.authToken)
    socket.on('jwt_ok', (data: DecodedToken) => console.log(data))
    socket.on('jwt_fail', (error: string) => console.log(error))
    socket.on('msg', (message: MessageData) => {
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
