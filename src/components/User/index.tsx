import React from "react";
import "./User.css";
// import store from "../store";
// import { activeUserId } from "../actions";
// import avatar from '../../img/avatar.jpg'

// function handleUserClick({ user_id }) {
//   store.dispatch(activeUserId(user_id));
// }

// const User = ({ user }) => {
//   const { name, profile_pic, status } = user;

//   return (
//     <div className="User" onClick={handleUserClick.bind(null, user)}>
//       <img src={profile_pic} alt={name.split(" ")[0]} className="User__pic" />
//       <div className="User__details">
//         <p className="User__details-name">{name}</p>
//         <p className="User__details-status">{status}</p>
//       </div>
//     </div>
//   );
// };
// export default React.memo(User);

interface Props {
	name: string,
  avatarSrc: string,
  status: string
}

const User = (props: Props) => {

  return (
    <div className="User">
      <img src={props.avatarSrc} alt="avatar" className="User__pic" />
      <div className="User__details">
        <p className="User__details-name">{props.name}</p>
        <p className="User__details-status">{props.status}</p>
      </div>
    </div>
  );
};
export default React.memo(User);