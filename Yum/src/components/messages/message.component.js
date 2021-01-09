import jwtDecode from "jwt-decode";
import React from "react";
import jwt_decode from "jwt-decode";

function Message(props) {
  const user = props.user_id;
  const messageData = props.data;

  const renderMessage = () => {
    const current_user = jwt - decode(localStorage.getItem("jwt"))._id;
    var className;
    if (user == props.data.from) {
      className = "sentMessage";
    } else {
      className = "receivedmessage";
    }
    return (
      <p className={className} style="background-color: light-grey">
        messageData
      </p>
    );
  };

  return <div>{renderMessage()}</div>;
}

export default Message;
