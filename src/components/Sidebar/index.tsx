import React from 'react';
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

import { IRootAction, IRootState } from "../../store/rootReducer";
import * as contactsAction from "../../store/contacts/actions";
import * as chatActions from "../../store/chat/actions";
import { UserData } from '../../store/contacts/types'
import { ChatData } from '../../store/chat/types'

import './Sidebar.css';
import User from "../User";
import userAvatar from '../../img/user_avatar.png'
// import chatAvatar from '../../img/chat_avatar.jpg'
import ButtonWithPopup from '../ButtonWithPopup';

const mapStateToProps = (state: IRootState) => ({
	activeUserId: state.user.userData._id,
	contacts: state.contacts.contactsData,
	chats: state.user.userData.chats,
});

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
	bindActionCreators(
		{
			getContacts: contactsAction.getContacts.request,
			getActiveChat: chatActions.getActiveChat.request,
			addChat: chatActions.addChat.request
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


	const getNameOfChat = (chat: ChatData) => {
		if (chat.members.length === 1) {
			return "You"
		} else if (chat.members.length > 2) {
			return chat.title ? chat.title : "Group"
		} else {
			let member = chat.members.find(member => {
				return member._id !== props.activeUserId
			})
			return member && (member.nick ? member.nick : member.login)
		}
	}


	const checkMemberInChat = (contactId: string) => {
		let contactsIdFromChat: string[] = []
		props.chats.map((chat: ChatData) => {
			if (chat.members.length === 2) {
				chat.members.forEach(member => {
					if (member._id === contactId) {
						contactsIdFromChat.push(member._id)
					}
				})
			}
		})
		console.log("contactsIdFromChat", contactsIdFromChat)
		// if (contactsIdFromChat && contactsIdFromChat.length) {
			return contactsIdFromChat
		// } else {
		// 	return false
		// }
		// return chat.members.find(member => {
		// 	return (console.log("member._id === contactId",member._id === contactId), member._id === contactId)
	  	// })
	}

	const activeChatHandler = (chatId: string) => {
		props.getActiveChat(chatId)
	};

	const addChatHandler = (contactId: string) => {
		// console.log("if", checkMemberInChat(contactId))
		if (checkMemberInChat(contactId).length) {
			console.log("getActiveChat", checkMemberInChat(contactId)[0])
			props.getActiveChat(checkMemberInChat(contactId)[0])
		} else {
			console.log("props.addChat")
			// props.addChat(contactId)
		}
	};

	const renderSidebarContent = () => {
		if (props.chats && props.chats.length) {
			return (
				<>
					{ props.chats.map(chat =>
						<User
							key={chat._id}
							name={getNameOfChat(chat)}
							avatarSrc={chat.avatar ? `http://chat.fs.a-level.com.ua/${chat.avatar.url}` : userAvatar}
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
							onClick={() => addChatHandler(contact._id)}
						/>
					) }
				</>
			)
		}
	}

	return (
		<aside className="sidebar">
			<ButtonWithPopup />
			{/* {renderSidebarContent()} */}
			{ props.contacts.map((contact: UserData) => 
				<User 
					key={contact.login}
					name={contact.nick ? contact.nick : contact.login}
					avatarSrc={contact.avatar ? `http://chat.fs.a-level.com.ua/${contact.avatar.url}` : userAvatar }
					onClick={() => addChatHandler(contact._id)}
				/>
			) }
		</aside>
	)
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Sidebar));