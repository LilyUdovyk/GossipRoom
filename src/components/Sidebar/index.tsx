import React, { useRef, useState } from 'react';
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

import { IRootAction, IRootState } from "../../store/rootReducer";
import * as contactsAction from "../../store/contacts/actions";
import * as chatActions from "../../store/chat/actions";
import * as messageAction from "../../store/message/actions"
import { UserData } from '../../store/contacts/types'
import { ChatData } from '../../store/chat/types'

import './Sidebar.css';
import User from "../User";
import userAvatar from '../../img/user_avatar.png'
import ButtonWithPopup from '../ButtonWithPopup';

const mapStateToProps = (state: IRootState) => ({
	activeUserId: state.user.userData._id,
	contacts: state.contacts.contactsData,
	chats: state.user.userData.chats,
	activeChatId: state.chat.activeChatId,
	newMessage: state.message.messageData
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
	// const [unreadMessage, setUnreadMessage] = React.useState(0)

	React.useEffect(() => {
		const authToken = localStorage.getItem('authToken')
		if (!authToken) {
			return
		}
		props.getContacts()
	}, [])

	const getDetailsOfChat = (chat: ChatData) => {
		if (chat.members.length === 1) {
			let details = {
				name: "You",
				avatar: chat.avatar ? `http://chat.fs.a-level.com.ua/${chat.avatar.url}` : userAvatar
			}
			return details
		} else if (chat.members.length > 2) {
			let details = {
				// name: chat.title ? chat.title : "Group",
				name: chat.title || "Group",
				avatar: chat.avatar ? `http://chat.fs.a-level.com.ua/${chat.avatar.url}` : userAvatar
			}
			return details
		} else {
			let member = chat.members.find(member => {
				return member._id !== props.activeUserId
			})
			let memberAvatar = member && member.avatar && `http://chat.fs.a-level.com.ua/${member.avatar.url}`
			let details = {
				// name: member && (member.nick ? member.nick : member.login),
				name: member && (member.nick || member.login),
				// avatar: chat.avatar ? `http://chat.fs.a-level.com.ua/${chat.avatar.url}` : (memberAvatar ? memberAvatar : userAvatar)
				avatar: chat.avatar ? `http://chat.fs.a-level.com.ua/${chat.avatar.url}` : (memberAvatar || userAvatar)
			}
			return details
		}
	}

	const checkMemberInChats = (contactId: string) => {
		let contactsChats: string[] = []
		props.chats.map((chat: ChatData) => {
			if (chat.members.length === 2) {
				chat.members.forEach(member => {
					if (member._id === contactId) {
						contactsChats.push(chat._id)
					}
				})
			}
		})
		return contactsChats
	}

	const activeChatHandler = (chatId: string) => {
		props.getActiveChat(chatId)
		// setUnreadMessage(0)
	};

	const addChatHandler = (contactId: string) => {
		if (checkMemberInChats(contactId).length) {
			props.getActiveChat(checkMemberInChats(contactId)[0])
		} else {
			props.addChat(contactId)
		}
	};

	const renderSidebarContent = () => {
		if (props.chats && props.chats.length) {
			return (
				<>
					{ props.chats.map(chat => 
						<User
							key={chat._id}
							chat_id={chat._id}
							name={getDetailsOfChat(chat).name}
							avatarSrc={getDetailsOfChat(chat).avatar}
							// avatarSrc={chat.avatar ? `http://chat.fs.a-level.com.ua/${chat.avatar.url}` : userAvatar}
							newMessage={props.newMessage}
							activeChatId={props.activeChatId}
							onClick={() => activeChatHandler(chat._id)}
						/>
					) }
				</>
			)
		} 
		else {
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
			{renderSidebarContent()}
		</aside>
	)
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Sidebar));