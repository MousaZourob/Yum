import React from "react";

function Conversation(props) {
  function renderConversation() {
    return (
      <div>
        <h1>Name: {props.data.toName}</h1>
        <h4>Last Message Sent: {props.data.lastMessage}</h4>
      </div>
    );
  }

  return (
    <div onClick={() => props.handleClick(props.data)}>
      {renderConversation()}
    </div>
  );
}

export default Conversation;
