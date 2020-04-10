import React from "react";
import "./MessageInput.css";

const MessageInput = () => {
  return (
    <form className="Message">
      <div className="MessageInputBox">
        <input
          className="MessageInput"
          placeholder="write a message"
        />
      </div>
    </form>
  );
};
export default React.memo(MessageInput);