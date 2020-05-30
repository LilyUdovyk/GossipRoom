import React from 'react'
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { IRootAction, IRootState } from "../../store/rootReducer";
import * as messageActions from "../../store/message/actions";
import { MessageData } from "../../store/chat/types";

import ForwardingBlock from "../ForwardingBlock"
import style from './style.module.css'

const mapStateToProps = (state: IRootState) => ({
  originalMessage: state.message.savedMessage.originalMessage,
  isForward: state.message.savedMessage.isForward,
  isReply: state.message.savedMessage.isReply,
});

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      forwardMessage: messageActions.forwardMessage.request,
      saveOriginalMessage: messageActions.saveOriginalMessage,
    },
    dispatch
  );

type MessageMenuProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const MessageMenu: React.FC<MessageMenuProps> = props => {

  const myRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
		if (props.originalMessage) {
      document.addEventListener("click", closeForwardBlock);
    } else {
      document.removeEventListener("click", closeForwardBlock);
    }
  }, [props.originalMessage])
  
  const closeForwardBlock = (event: any) => {
    if (myRef.current && !(myRef.current.contains(event.target))) {
      // deleteOriginalMessage()
    }
  };

  // const deleteOriginalMessage = () => {
  //   props.saveOriginalMessage({originalMessage: null, isReply: false, isForward: false})
  // }

  const replyToMessage = () => {
    console.log("reply saveOriginalMessage")
    props.saveOriginalMessage({originalMessage: props.originalMessage, isReply: true})
  }

  const forwardMessage = () => {
    console.log("forward saveOriginalMessage")
    props.saveOriginalMessage({originalMessage: props.originalMessage, isForward: true})
  }

  return (
    <>
      <div ref={myRef} className={style.messageMenu}>
        <ul className={style.menuList}>
          <li 
            className={style.menuItem}
            onClick = { () => replyToMessage()}
          >
            <FontAwesomeIcon icon="reply" />
            Reply
          </li>
          <li 
            className={style.menuItem}
            onClick = { () => forwardMessage()}
          >
            <FontAwesomeIcon icon="share" />
            Forward message
          </li>
        </ul>
      </div>
      { props.isForward &&
        <ForwardingBlock />
      }
    </>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(MessageMenu));