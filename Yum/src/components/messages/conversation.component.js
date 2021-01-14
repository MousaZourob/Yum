import React from "react";

function Conversation(props) {
  function renderConversation() {
    return (
      <div className="card" style={{ margin: "4%", borderRadius: "10px", cursor: "pointer", paddingLeft: "4%", paddingTop: "6.4%" }}>
        <div style={{marginBottom:"0"}}>
          <h3 style={{ marginBottom: "0" }}>{props.data.toName}</h3>
          <p>{props.data.lastMessage}</p>
        </div>

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
