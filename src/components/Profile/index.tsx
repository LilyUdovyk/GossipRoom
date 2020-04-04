import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

import { IRootAction } from "../../store/rootReducer";
import * as authActions from "../../store/auth/actions";
import { push } from "connected-react-router";

import style from './style.module.css'
import Sidebar from '../Sidebar';
import Main from "../Main";
import { store } from '../../App'

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      authByCreds: authActions.authByCreds.request,
      pushRouter: push
    },
    dispatch
  );

type ProfileProps = ReturnType<typeof mapDispatchToProps>;

const Profile: React.FC<ProfileProps> = () => {
  // const { contacts } = store.getState();
  return (
    <div className={style.profile}>
      {/* <Sidebar contacts ={_.values(contacts)}/> */}
      {/* <Main user = {user} activeUserId ={activeUserId}/> */}
      {/* <Sidebar contacts={contacts} /> */}
      <Sidebar  />
      <Main />
    </div>
  );
};

export default connect(null, mapDispatchToProps)(React.memo(Profile));

