import React, { useState } from "react";

function MessagePage() {
  const conversations = [];
  const [currentConvo, setCurrentConvo] = useState(null);

  const handleClick = (conversation) => {
    setCurrentConvo(conversation);
  };

  const renderPage = () => {
    conversations.map((conversation) => {
      <Conversation
        data={conversation}
        key={conversation.room_id}
        handleClick={handleClick}
      />;
    });

    if (currentConvo) {
      <Messages data={currentConvo}/>;
    } else {
      return "No conversation selected";
    }
  };

  return <div>{renderPage()}</div>;
}

export default MessagePage;
