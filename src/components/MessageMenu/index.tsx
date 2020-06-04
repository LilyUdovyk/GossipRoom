import React from 'react'
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames';

import { IRootAction, IRootState } from "../../store/rootReducer";
import * as messageActions from "../../store/message/actions";

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

  const [isVisibleMenu, setIsVisibleMenu] = React.useState(true);

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
      setIsVisibleMenu(false)
    }
  };

  const replyToMessage = () => {
    props.saveOriginalMessage({originalMessage: props.originalMessage, isReply: true})
    setIsVisibleMenu(false)
  }

  const forwardMessage = () => {
    props.saveOriginalMessage({originalMessage: props.originalMessage, isForward: true})
  }

  return (
    <>
      <div ref={myRef}
        className={classnames(style.messageMenu, {
          [style.invisible]: !isVisibleMenu
        })} 
      >
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