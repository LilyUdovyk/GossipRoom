import React from "react";
import "./Empty.css";

interface Props {
  name: string,
  avatarSrc: string
}

const Empty = (props: Props) => {
  return (
    <div className="Empty">
      <h1 className="EmptyName">Welcome, {props.name} </h1>
      <img src={props.avatarSrc} alt={props.name} className="EmptyImg" />
      <p className="EmptyInfo">
        Please select a chat to start messaging
      </p>
    </div>
  );
};

export default Empty;