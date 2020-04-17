import React from 'react';
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
// import { push } from "connected-react-router";

import { IRootAction, IRootState } from "../../store/rootReducer";
import * as contactsAction from "../../store/contacts/actions";
import * as chatActions from "../../store/chat/actions";
import { UserData } from '../../store/contacts/types'

import './Sidebar.css';
import User from "../User";
import userAvatar from '../../img/user_avatar.png'
import chatAvatar from '../../img/chat_avatar.jpg'

const mapStateToProps = (state: IRootState) => ({
	activeUserId: state.user.userData._id,
	contacts: state.contacts.contactsData,
	chats: state.user.userData.chats,
	// activeChat: state.chat.chatData,
});

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
	bindActionCreators(
		{
			getContacts: contactsAction.getContacts.request,
			getActiveChat: chatActions.getActiveChat.request
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


	const getNameOfChat = () => {
		let nameOfChat: string | undefined
		{ props.chats.map(chat => {
			console.log("chat", chat)
			if (chat.members.length > 2 && chat.title) {
				return nameOfChat = chat.title
			} else {
				let member = chat.members.find(member => {
					return member._id !== props.activeUserId
				})
				console.log("member", member)
				return nameOfChat = member && (member.nick ? member.nick : member.login)
			}
		}) }
	}

	const renderSidebarContent = () => {
		if (props.chats && props.chats.length) {
			// console.log("nameOfChat", nameOfChat)
			return (
				<>
					{ props.chats.map(chat =>
						// {let nameOfChat: string | undefined
						// if (chat.members.length > 2 && chat.title) {
						// 	return nameOfChat = chat.title
						// } else {
						// 	let member = chat.members.find(member => {
						// 		return member._id !== props.activeUserId
						// 	})
						// 	console.log("member", member)
						// 	return nameOfChat = member && (member.nick ? member.nick : member.login)
						// }}

						<User
							key={chat._id}
							name={nameOfChat}
							avatarSrc={chat.avatar ? `http://chat.fs.a-level.com.ua/${chat.avatar.url}` : chatAvatar}
							onClick={() => activeChatHandler(chat._id)}
						/>
					) }
				</>
			)
		} else {
			return (
				<>
					{ props.contacts.map((contact: UserData) => 
						<User 
							key={contact.login}
							name={contact.nick ? contact.nick : contact.login}
							avatarSrc={contact.avatar ? `http://chat.fs.a-level.com.ua/${contact.avatar.url}` : userAvatar }
						/>
					) }
				</>
			)
		}
	}

	const activeChatHandler = (chatId: string) => {
		console.log(chatId)
		props.getActiveChat(chatId)
	};

	return (
		<aside className="Sidebar">
        	{renderSidebarContent()}
    	</aside>
	)
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Sidebar));