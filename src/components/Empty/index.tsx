import React from "react";

import style from './style.module.css'

interface Props {
  name: string,
  avatarSrc: string
}

const Empty = (props: Props) => {
  return (
    <div className={style.empty}>
      <h1 className={style.emptyName}>Welcome, {props.name} </h1>
      <img src={props.avatarSrc} alt={props.name} className={style.avatar} />
      <p className={style.emptyInfo}>
        Please select a chat to start messaging
      </p>
    </div>
  );
};
export default React.memo(Empty);