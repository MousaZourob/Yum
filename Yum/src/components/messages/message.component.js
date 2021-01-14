import React from "react";
import '../styles.css'

function Message(props) {
  const user = props.user_id;

  const renderMessage = () => {
    const sentMessageStyle = {
      backgroundColor: "lightblue",
      color: "black",
      float: "right",
      borderRadius: "18px",
      padding: "1%",
      textAlign: "center",
      maxWidth: "80%",
      marginRight: "16px"
    }

    const receivedMessageStyle = {
      backgroundColor: "lightgray",
      float: "left",
      borderRadius: "18px",
      padding: "1%",
      textAlign: "center",
      maxWidth: "80%"
    }

    return (
      <div style={{overflow: "auto"}}>
        <p style={(user === props.data.from) ? sentMessageStyle : receivedMessageStyle}>
          {props.data.message}
        </p>
      </div>
      
    );
  };

  return <div>{renderMessage()}</div>;
}

export default Message;
