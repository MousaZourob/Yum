import React from "react";
import Message from "./message.component";

function Messages(props) {
  const messages = props.messages;

  const renderMessages = () => {
    var userid;
    if (message.from == props.userid) {
      userid = message.from;
    } else {
      userid = message.to;
    }
    messages.map((message) => {
      <Message user_id={userid} data={message.message}></Message>;
    });
  };

  return <div>{renderMessages()}</div>;
}

export default Messages;
