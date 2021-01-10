import React from "react";

function Conversation(props) {
  function renderConversation() {
    return (
      <div className="card" style={{margin: "4%", borderRadius: "10px", padding: "2%", cursor: "pointer" }}>
        <h3>Name: {props.data.toName}</h3>
        <p>Last Message Sent: {props.data.lastMessage}</p>
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
