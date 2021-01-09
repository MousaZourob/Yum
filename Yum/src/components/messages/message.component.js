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
      <p className={className} style={{backgroundColor: "light-grey"}}>
        {props.data.message}
      </p>
    );
  };

  return <div>{renderMessage()}</div>;
}

export default Message;
