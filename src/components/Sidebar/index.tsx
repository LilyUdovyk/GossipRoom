import React, { useRef, useState } from 'react';
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { IRootAction, IRootState } from "../../store/rootReducer";
import * as userActions from "../../store/user/actions";
import * as contactsActions from "../../store/contacts/actions";
import * as chatActions from "../../store/chat/actions";
import { UserData } from '../../store/user/types'
import { ChatData } from '../../store/chat/types'

import User from "../User";
import userAvatar from '../../img/user_avatar.png'
import chatAvatar from '../../img/chat_avatar.png'
import ButtonWithPopup from '../ButtonWithPopup';
import style from './style.module.css'

const mapStateToProps = (state: IRootState) => ({
	activeUserId: state.user.userData._id,
	contacts: state.contacts.contactsData,
	chats: state.user.userData.chats,
	activeChatId: state.chat.chatSuccessData.activeChat._id,
	activeChatName: state.chat.chatSuccessData.activeChatName,
	newMessage: state.message.messageData
});

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
	bindActionCreators(
		{
			getContacts: contactsActions.getContacts.request,
			getUser: userActions.getUser.request,
			getActiveChat: chatActions.getActiveChat.request,
			addChat: chatActions.addChat.request
		},
		dispatch
	);

type SidebarProps = ReturnType<typeof mapStateToProps> &
	ReturnType<typeof mapDispatchToProps>;

type SidebarView = "contacts" | "chats"

const Sidebar: React.FC<SidebarProps> = props => {

	const [sidebarView, setSidebarView] = React.useState<SidebarView>("chats")

	React.useEffect(() => {
		const authToken = localStorage.getItem('authToken')
		if (!authToken) {
			return
		}
		props.getUser()
		// console.log("props.chats,props.chats.length", props.chats, props.chats.length)
		// if (props.chats && props.chats.length) {
		// 	setSidebarView("contacts")
		// }
		props.getContacts()
	}, [])

	const getDetailsOfChat = (chat: ChatData) => {
		let details
		if (chat.members.length === 1) {
			details = {
				name: chat.title || "You",
				avatar: chat.avatar ? `http://chat.fs.a-level.com.ua/${chat.avatar.url}` : userAvatar
			}
		} else if (chat.members.length > 2) {
			details = {
				name: chat.title || "Group",
				avatar: chat.avatar ? `http://chat.fs.a-level.com.ua/${chat.avatar.url}` : chatAvatar
			}
		} else {
			let member = chat.members.find(member => {
				return member._id !== props.activeUserId
			})
			let nameFromMember = member && (member.nick || member.login)
			let memberAvatar = member && member.avatar && `http://chat.fs.a-level.com.ua/${member.avatar.url}`
			details = {
				name: chat.title || nameFromMember,
				avatar: chat.avatar ? `http://chat.fs.a-level.com.ua/${chat.avatar.url}` : (memberAvatar || userAvatar)
			}
		}
		return details
	}

	const checkMemberInChats = (contactId: string) => {
		let contactsChats: string[] = []
		props.chats.map(chat => {
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
	};

	const addChatHandler = (contactId: string) => {
		if (checkMemberInChats(contactId).length) {
			props.getActiveChat(checkMemberInChats(contactId)[0])
		} else {
			props.addChat(contactId)
		}
	};

	const renderSidebarContent = () => {
			if (sidebarView === "chats") {
			return (
				<>
					{ props.chats.map(chat => {
						return (
							<User
								key={chat._id}
								chat_id={chat._id}
								name={getDetailsOfChat(chat).name}
								avatarSrc={getDetailsOfChat(chat).avatar}
								newMessage={props.newMessage}
								activeChatId={props.activeChatId}
								onClick={() => activeChatHandler(chat._id)}
							/>
						)
					})}
				</>
			)
		} else {
			return (
				<>
					{ props.contacts.map((contact: UserData) => {
						return (
							<User 
								key={contact._id}
								name={contact.nick || contact.login}
								avatarSrc={contact.avatar ? `http://chat.fs.a-level.com.ua/${contact.avatar.url}` : userAvatar }
								onClick={() => addChatHandler(contact._id)}
							/>
						)
					})}
				</>
			)
		}
	}

	return (
		<aside className={style.sidebar}>
			<div className={style.buttonBlock}>
				<ButtonWithPopup />
				{ sidebarView === "chats" && 
					<button 
						className={style.navButton}
						title="Contacts"
						onClick={() => setSidebarView("contacts")}
					>
						<FontAwesomeIcon icon="user-friends" />
					</button>
				}
				{ sidebarView === "contacts" &&
					<button 
						className={style.navButton}
						title="Chats"
						onClick={() => setSidebarView("chats")}
					>
						<FontAwesomeIcon icon="comments" />
					</button>
				}
			</div>
			{renderSidebarContent()}
		</aside>
	)
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Sidebar));