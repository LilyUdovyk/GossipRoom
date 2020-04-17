import React from "react";
import "./User.css";

interface Props {
	name: any,
  avatarSrc: string,
  onClick?: any
}

const User = (props: Props) => {
  console.log("user", props.name)
  return (
    <div className="User" onClick={props.onClick}>
      <img src={props.avatarSrc} alt="avatar" className="UserImg" />
      <div className="UserDetails">
        <p className="UseDetailsName">{props.name}</p>
      </div>
    </div>
  );
};
export default React.memo(User);