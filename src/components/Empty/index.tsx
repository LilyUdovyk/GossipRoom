import React from "react";
import "./Empty.css";

interface Props {
  name: string,
  avatarSrc: string
}

const Empty = (props: Props) => {
  // const { name, profile_pic, status } = user;
  // const first_name = name.split(" ")[0];

  return (
    <div className="Empty">
      <h1 className="Empty__name">Welcome, {props.name} </h1>
      <img src={props.avatarSrc} alt={props.name} className="Empty__img" />
      <p className="Empty__status">
        Please select a chat to start messaging
      </p>
    </div>
  );
};

export default Empty;