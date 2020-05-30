import React from "react";
import "./Empty.css";

interface Props {
  name: string,
  avatarSrc: string
}

const Empty = (props: Props) => {
  return (
    <div className="empty">
      <h1 className="emptyName">Welcome, {props.name} </h1>
      <img src={props.avatarSrc} alt={props.name} className="avatar" />
      <p className="emptyInfo">
        Please select a chat to start messaging
      </p>
    </div>
  );
};
export default React.memo(Empty);