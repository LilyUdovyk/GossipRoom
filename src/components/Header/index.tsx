import React from "react";

import style from './style.module.css'
import ButtonWithChatDetails from '../ButtonWithChatDetails'

interface Props {
	activeChatName: string,
}

const Header = (props: Props) => {
	return (
		<header className={style.header}>
			<h1 className={style.headerName}>{props.activeChatName}</h1>
			<ButtonWithChatDetails />
		</header>
	);
}
export default React.memo(Header);