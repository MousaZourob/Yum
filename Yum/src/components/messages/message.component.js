import React from "react";

function Message(props) {
  const user = props.user_id;

  const renderMessage = () => {
    let className;
    if (user === props.data.from) {
      className = "sentMessage";
    } else {
      className = "receivedMessage";
    }
    return (
      <p
        className={className}
        style={className === "sentMessage" ? { backgroundColor: "gray" } : null}
      >
        {props.data.message}
      </p>
    );
  };

  return <div>{renderMessage()}</div>;
}

export default Message;
