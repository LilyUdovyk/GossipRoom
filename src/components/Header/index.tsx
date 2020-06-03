import React from "react";

import style from './style.module.css'

interface Props {
	userName: string,
}

const Header = (props: Props) => {
	return (
		<header className={style.header}>
			<h1 className={style.headerName}>{props.userName}</h1>
			<button className={style.settingsButton}>...</button>
		</header>
	);
}
export default React.memo(Header);