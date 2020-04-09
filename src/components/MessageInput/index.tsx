import React from "react";
// import store from "../store";
// import { setTypingValue, sendMessage, deleteReplyBoxFromChatBox} from "../actions";
import "./MessageInput.css";

const MessageInput = () => {
  // const state = store.getState();  

  // const handleSubmit = e => {
  //     e.preventDefault();
  //     const { typing, activeUserId } = state;
  //     store.dispatch(sendMessage(typing, activeUserId));
  //   };

  // const handleChange = e => {
  //   store.dispatch(setTypingValue(e.target.value));
  // };

  return (
    <form className="Message"
    // onSubmit = {handleSubmit}
    >
      <div className="Message_input_box">
        <div id="sam"
        // className={`Message_reply ${state.chatBoxContainReply[0] ? "show" : ""}`}
        >
          {/* <span>{state.chatBoxContainReply[0]}</span> */}
          {/* <p className = "Message_reply_name">{state.chatBoxContainReply[2]}</p>
     {state.chatBoxContainReply[1].substring(0,70)}
     <button onClick = {handleDeleteClick} className= "Message_reply_delete">x</button> */}
        </div>
        <input
          className="Message__input"
          // onChange={handleChange}
          // value={value}
          placeholder="write a message"
        />
      </div>
    </form>
  );
};
// const handleDeleteClick = (event) => {
//   event.stopPropagation();
//   store.dispatch(deleteReplyBoxFromChatBox());
// }
export default React.memo(MessageInput);