import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { MessageData } from "../../store/message/types";
import FormattedMessage from "../FormattedMessage"
import style from"./style.module.css";

interface Props {
    originalMessage: MessageData,
    deleteOriginalMessage: any
}

const OriginalMessageBlock = (props: Props) => {
    return (
        <div className={style.originalMessageBlock}>
            <div className={style.originalMessage}>
                <p className={style.owner}>
                    { props.originalMessage.owner.nick || props.originalMessage.owner.login }
                </p>
                <FormattedMessage message={props.originalMessage} />
                <button 
                    onClick = {() => props.deleteOriginalMessage()}
                    className={style.deleteOriginalMessage}
                >
                    <FontAwesomeIcon icon="times" />
                </button>
            </div>
        </div>
	);
}

export default React.memo(OriginalMessageBlock);