import React from "react";
import '../styles.css'

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
        style={className === "sentMessage" ? 
        { backgroundColor: "lightgray",
         marginLeft: "90%", 
         borderRadius: "18px", 
         padding: "1%",
         textAlign: "center" } 
        : { backgroundColor: "lightgray",
        marginRight: "90%",
        borderRadius: "18px", 
        padding: "1%",
        textAlign: "center" } }
      >
        {props.data.message}
      </p>
    );
  };

  return <div>{renderMessage()}</div>;
}

export default Message;
