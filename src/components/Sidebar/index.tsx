import React from 'react';
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
// import { push } from "connected-react-router";

import { IRootAction, IRootState } from "../../store/rootReducer";
import * as contactsAction from "../../store/contacts/actions";
import * as chatActions from "../../store/chat/actions";
import { ChatData } from '../../store/chat/types'
import { UserData } from '../../store/contacts/types'

import './Sidebar.css';
import User from "../User";
import userAvatar from '../../img/user_avatar.png'
import chatAvatar from '../../img/chat_avatar.jpg'

const mapStateToProps = (state: IRootState) => ({
	activeUserId: state.user.userData._id,
	contacts: state.contacts.contactsData,
	chats: state.user.userData.chats,
});

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
	bindActionCreators(
		{
			getContacts: contactsAction.getContacts.request,
			getActiveChat: chatActions.getActiveChat.request
			//   setActiveChat: actions.setActiveChat
			// pushRouter: push
		},
		dispatch
	);

type SidebarProps = ReturnType<typeof mapStateToProps> &
	ReturnType<typeof mapDispatchToProps>;

const Sidebar: React.FC<SidebarProps> = props => {
	React.useEffect(() => {
		const authToken = localStorage.getItem('authToken')
		if (!authToken) {
			return
		}
		props.getContacts()
	}, [])

	// let nameOfChat: string
	// 	{
	// 		props.chats.map(chat => {
	// 			{
	// 				if (chat.members.length > 2 && chat.title) {
	// 					nameOfChat = chat.title
	// 				} else {
	// 					chat.members.map(member => {
	// 						if (member._id !== props.activeUserId) {
	// 							nameOfChat = member.nick ? member.nick : member.login
	// 						}
	// 					})
	// 				}
	// 			}
	// 		})
	// 	}
	// }

	const activeChatHandler = (chatId: string) => {
		console.log(chatId)
		props.getActiveChat(chatId)
	};

	return (
		<aside className="Sidebar">
			{/* {props.contacts.map((contact: UserData) => 
				<User 
					key={contact.login}
					name={contact.nick ? contact.nick : contact.login}
					avatarSrc={contact.avatar ? `http://chat.fs.a-level.com.ua/${contact.avatar.url}` : userAvatar }
				/>
			)} */}
			{props.chats.map((chat) =>
				<User
					key={chat._id}
					name={chat.title ? chat.title : chat._id}
					avatarSrc={chat.avatar ? `http://chat.fs.a-level.com.ua/${chat.avatar.url}` : chatAvatar}
					onClick={() => activeChatHandler(chat._id)}
				/>
			)}
		</aside>
	)
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Sidebar));
