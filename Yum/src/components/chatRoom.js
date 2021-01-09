import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";

export default function ChatRoom (props) {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient("http://localhost:8000", {
            query: { roomID: 'public' }
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
            from: 'test1',
            room: 'public',
            message: message
        });
    };
    return (
        <div>
            <h1>Chat</h1>
            <button onClick={() => sendMessage('hi')}>Send Message</button>
        </div>
    )
}