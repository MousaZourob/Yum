import React, { useState, useEffect } from "react";
import Messages from "./messages.component";
import Conversation from "./conversation.component";
import axios from "axios";
import jwt_decode from "jwt-decode";
import queryString from "query-string";

function MessagePage() {
  const [conversations, setConversations] = useState([]);
  const [currentConvo, setCurrentConvo] = useState(null);

  const user_id = jwt_decode(localStorage.getItem("jwt"))._id;

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8000/chat/convos",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    }).then(res => {
      setConversations(res.data);
      const openConvo = res.data.filter(convo => convo.roomID === queryString.parse(window.location.search).open);
      setCurrentConvo((openConvo.length > 0) ? openConvo[0] : null);
    })
  }, []);

  const handleClick = (conversation) => {
    setCurrentConvo(conversation);
  };

  const renderPage = () => {
    return conversations.map((conversation) => {
      return <Conversation
        data={conversation}
        key={conversation.roomID}
        handleClick={handleClick}
        user_id={user_id}
      />;
    });
  };

  return (
    <div style={{background: "lightblue"}}>
      
      <div class="col-sm-3" style={{float: "left", borderRightStyle: "solid", borderRightColor: "lightgrey"}}>{renderPage()}</div>
      <div class="col-sm-9" style={{float: "right"}}>{(currentConvo) ? <Messages data={currentConvo} user_id={user_id} /> : "No conversation selected"}</div>
      
    </div>
  )
}

export default MessagePage;
