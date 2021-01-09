import React from "react";

function Conversation(props) {
  function renderConversation() {
    var userid;
    if(props.data.to == props.user_id){
        userid = props.data.to
    }
    else{
        userid = props.data.from
    }
    return (
      <div>
        {userid}
        {props.data.last_message}
      </div>
    );
  }

  return <div onClick={props.handleClick(props.data.room_id)}>{{ renderConversation()}}</div>;
}

export default Conversation;
