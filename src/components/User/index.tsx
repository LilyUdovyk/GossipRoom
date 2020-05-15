import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

import { IRootAction, IRootState } from "../../store/rootReducer";
import * as chatActions from "../../store/chat/actions";
import * as messageAction from "../../store/message/actions"

import "./User.css";

interface ownProps {
  name: string | undefined,
  chat_id?: string,
  avatarSrc: string,
  onClick?: any
}

const mapStateToProps = (state: IRootState, props: ownProps) => ({
	activeChatId: state.chat.activeChatId,
  chatIdWithNewMessage: state.message.messageData.chat._id,
  name: props.name,
  chat_id: props.chat_id,
  avatarSrc: props.avatarSrc,
  onClick: props.onClick
});

// const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
// 	bindActionCreators(
// 		{
// 			getContacts: contactsAction.getContacts.request,
// 			getActiveChat: chatActions.getActiveChat.request,
// 			addChat: chatActions.addChat.request
// 		},
// 		dispatch
// 	);

type UserProps = ReturnType<typeof mapStateToProps>;

const User: React.FC<UserProps> = props => {

  const [unreadMessage, setUnreadMessage] = React.useState(0)

  React.useEffect(() => {
		const authToken = localStorage.getItem('authToken')
		if (!authToken) {
			return
		}
		if (props.chatIdWithNewMessage === props.chat_id && props.chat_id !== props.activeChatId) {
			setUnreadMessage(unreadMessage + 1)
		}
	}, [])

  return (  
    <div className="User" onClick={props.onClick}>
      <img src={props.avatarSrc} alt="avatar" className="UserImg" />
      <div className="UserDetails">
        <p className="UseDetailsName">{props.name}</p>
      </div>
      { unreadMessage > 0 && <p>{ unreadMessage }</p> }
    </div>
  );
};
export default connect(mapStateToProps, null)(React.memo(User));
