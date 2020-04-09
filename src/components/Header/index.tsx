import React from "react";
import "./Header.css";

interface Props {
	userName: string,
	// status: string
  }

function Header(props: Props){

	return (
		<header className = "Header">
			<h1 className = "Header__name">{props.userName}</h1>
			{/* <p className = "Header__status">{props.status}</p> */}
		</header>
	);
}

export default React.memo(Header);