import React from "react";
import "./Header.css";

interface Props {
	userName: string,
  }

function Header(props: Props){

	return (
		<header className = "Header">
			<h1 className = "HeaderName">{props.userName}</h1>
		</header>
	);
}

export default React.memo(Header);