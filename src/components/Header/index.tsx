import React from "react";
import "./Header.css";

interface Props {
	userName: string,
}

const Header = (props: Props) => {
	return (
		<header className = "header">
			<h1 className = "headerName">{props.userName}</h1>
			<button className ="deleteButton">...</button>
		</header>
	);
}

export default React.memo(Header);