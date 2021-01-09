import React from "react";

function Conversation(props) {
  function renderConversation() {
    return (
      <div>
        {props.data.toName}
        {props.data.lastMessage}
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
