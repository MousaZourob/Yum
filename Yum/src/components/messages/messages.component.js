import React, { useEffect, useState, useRef } from "react";
import Message from "./message.component";
import socketIOClient from "socket.io-client";

function Messages(props) {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient("http://localhost:8000", {
      query: { roomID: props.data.roomID }
    });

    socketRef.current.emit('getChatHistory');
    socketRef.current.on('chatHistory', (messageHistory) => {
      setMessages(messageHistory);
    });
    socketRef.current.on('newChatMessage', (incomingMessage) => {
      setMessages(messages => [...messages, incomingMessage]);
    });
  }, []);

  const sendMessage = (message) => {
    socketRef.current.emit('newChatMessage', {
      from: props.user_id,
      room: props.data.roomID,
      message: message
    });
  };
  const renderMessages = () => {
    return messages.map((message) => {
      return <Message user_id={props.user_id} data={message}></Message>;
    });
  };

  return <div>{renderMessages()}</div>;
}

export default Messages;
