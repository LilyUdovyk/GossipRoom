import React from "react";

import { MessageData } from "../../store/message/types";
import style from"./style.module.css";

interface Props {
    originalMessage: MessageData,
    content: any
}

const OriginalMessageBlock = (props: Props) => {
	return (
        <div className={style.originalMessageBlock}>
            <p className="owner">
                { props.originalMessage.owner.nick || props.originalMessage.owner.login }
            </p>
            <p>
                { props.content }
            </p>
        </div>
	);
}

export default React.memo(OriginalMessageBlock);