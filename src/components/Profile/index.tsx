import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import { IRootAction, IRootState } from "../../store/rootReducer";
import * as userAction from "../../store/user/actions";
import * as contactsAction from "../../store/contacts/actions";

import style from './style.module.css'
import Sidebar from '../Sidebar';
import Main from "../Main";

// const mapStateToProps = (state: IRootState) => ({
//   contactsArray: state.contacts.contactsData,
// });

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      getUser: userAction.getUser.request,
      getContacts: contactsAction.getContacts.request,
      // pushRouter: push
    },
    dispatch
  );

// type ProfileProps = ReturnType<typeof mapStateToProps> &
//   ReturnType<typeof mapDispatchToProps>;

type ProfileProps = ReturnType<typeof mapDispatchToProps>;

const Profile: React.FC<ProfileProps> = props => {
  React.useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      return
    }
    props.getUser()
    props.getContacts()
  },[])

  return (
    <div className={style.profile}>
      <Sidebar />
      <Main />
    </div>
  );
};

export default connect( null, mapDispatchToProps)(React.memo(Profile));

