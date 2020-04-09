import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import jwtDecode from "jwt-decode";

import { IRootAction, IRootState } from "../../store/rootReducer";
import * as activeUserAction from "../../store/user/actions";

import style from './style.module.css'
import Sidebar from '../Sidebar';
import Main from "../Main";

const mapStateToProps = (state: IRootState) => ({
  id: state.auth.authData.id,
});

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      getUser: activeUserAction.getUser.request,
      pushRouter: push
    },
    dispatch
  );

type ProfileProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const Profile: React.FC<ProfileProps> = (props) => {
  React.useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      return
    }
    props.getUser()
  },[])

  return (
    <div className={style.profile}>
      <Sidebar  />
      <Main />
    </div>
  );
};

export default connect( mapStateToProps, mapDispatchToProps)(React.memo(Profile));

