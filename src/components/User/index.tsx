import React from "react";
import "./User.css";

interface Props {
	name: string,
  avatarSrc: string,
}

const User = (props: Props) => {

  return (
    <div className="User">
      <img src={props.avatarSrc} alt="avatar" className="UserImg" />
      <div className="UserDetails">
        <p className="UseDetailsName">{props.name}</p>
      </div>
    </div>
  );
};
export default React.memo(User);