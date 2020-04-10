import React from 'react';
// import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import { IRootAction, IRootState } from "../../store/rootReducer";
import { UserData } from '../../store/contacts/types'

import './Sidebar.css';
import User from "../User";
import userAvatar from '../../img/user_avatar.png'

const mapStateToProps = (state: IRootState) => ({
  contactsArray: state.contacts.contactsData
});

// type SidebarProps = ReturnType<typeof mapStateToProps>;

const Sidebar: React.FC<any> = props => { 
  return (
		<aside className="Sidebar">
			{props.contactsArray.map((contact: UserData) => 
			<User 
				key={contact.login}
				name={contact.nick ? contact.nick : contact.login}
				avatarSrc={contact.avatar ? `http://chat.fs.a-level.com.ua/${contact.avatar.url}` : userAvatar }
			/>)}
		</aside>
  )
};
export default connect(mapStateToProps, null)(React.memo(Sidebar));
