import React from "react";
import "./Empty.css";
import avatar2 from '../../img/avatar2.jpg'

const Empty = () => {
  // const { name, profile_pic, status } = user;
  // const first_name = name.split(" ")[0];

  return (
    <div className="Empty">
      <h1 className="Empty__name">Welcome, Lily </h1>
      <img src={avatar2} alt="Name" className="Empty__img" />
      <p className="Empty__status">
        <b>Status:</b> The apple is a monkey.
      </p>
      <button className="Empty__btn">Start a conversation</button>
      <p className="Empty__info">
        Search for someone to start chatting with or go to Contacts to see who
        is available
      </p>
    </div>
  );
};

export default Empty;