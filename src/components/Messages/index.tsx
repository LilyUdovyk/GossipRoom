import React, { Component } from "react";
import "./Messages.css";

class Messages extends Component {
  render() {
    return (
      <div className="Chats">
        {/* {this.props.messages.map(message => (
          <Chat activeUser = {this.props.activeUser} message={message} key={message.number}/>
        ))} */}
      </div>
    );
  }
}

export default React.memo(Messages);