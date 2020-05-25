import React from "react";

import { MessageData } from "../../store/message/types";
import FormattedMessage from "../FormattedMessage"
import style from"./style.module.css";

interface Props {
    originalMessage: MessageData,
}

const OriginalMessageBlock = (props: Props) => {
	return (
        <div className={style.originalMessageBlock}>
            <div className={style.originalMessage}>
                <p className="owner">
                    { props.originalMessage.owner.nick || props.originalMessage.owner.login }
                </p>
                <FormattedMessage message={props.originalMessage} />
            </div>
        </div>
	);
}

export default React.memo(OriginalMessageBlock);