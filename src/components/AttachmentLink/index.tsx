import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from "@fortawesome/fontawesome-svg-core"

import style from "./style.module.css";

interface Props {
    url: string,
    icon: IconProp,
    text: string
}

const AttachmentLink = (props: Props) => {
    return (
        <a href={`http://chat.fs.a-level.com.ua/${props.url}`}
            className={style.attachmentLink}
        >
            <FontAwesomeIcon icon={props.icon} size="3x" className={style.fileIcon} />
            <p>
                {props.text}
            </p>
        </a>
    );
};
export default React.memo(AttachmentLink);