import React, { useEffect, useState, useRef } from "react";
import Message from "./message.component";
import socketIOClient from "socket.io-client";
import { useForm } from "react-hook-form";

function Messages(props) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socketRef = useRef();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    socketRef.current = socketIOClient("http://localhost:8000", {
      query: { roomID: props.data.roomID },
    });

    socketRef.current.emit("getChatHistory");
    socketRef.current.on("chatHistory", (messageHistory) => {
      setMessages(messageHistory);
    });
    socketRef.current.on("newChatMessage", (incomingMessage) => {
      setMessages((messages) => [...messages, incomingMessage]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [props.data.roomID]);

  const sendMessage = (message) => {
    socketRef.current.emit("newChatMessage", {
      from: props.user_id,
      room: props.data.roomID,
      message: message,
    });
  };

  const renderMessages = () => {
    return messages.map((message) => {
      return <Message user_id={props.user_id} data={message}></Message>;
    });
  };

  const onSubmit = (data) => {
    sendMessage(message);
    setMessage("");
  };

  const renderSendMessage = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)} style={{width: "100%"}}>
        <input class="form-group" type="text" name="message" ref={register} placeholder="Type your message here" value={message} onChange={(e) => setMessage(e.target.value)}
        style={{width: "100%", height: "50px", marginBottom:"4%", padding: "1%"}}/>
      </form>
    );
  };

  return (
    <div style={{maxWidth: "1000px"}}>
      <div style={{ overflowY: "scroll", height: "calc(100vh - 170px)"}}>{renderMessages()}</div>
      {renderSendMessage()}
    </div>
  );
}

export default Messages;
