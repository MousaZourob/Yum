import React from "react";
import { Duration } from "luxon";

function Conversation(props) {
  function getDate(timeInMills) {
    const duration = Duration.fromMillis(Date.now() - timeInMills).shiftTo('years', 'months', 'days', 'hours', 'minutes', 'seconds', 'milliseconds').toObject();
    console.log(duration);
    if (duration.years > 0) {
      return `${duration.years} Years Ago`;
    } else if (duration.months > 0) {
      return `${duration.months} Months Ago`;
    } else if (duration.weeks > 0) {
      return `${duration.weeks} Weeks Ago`;
    } else if (duration.days > 0) {
      return `${duration.days} Days Ago`;
    } else if (duration.hours > 0) {
      return `${duration.hours} Hours Ago`;
    } else if (duration.minutes > 0) {
      return `${duration.minutes} Minutes Ago`;
    } else if (duration.seconds > 0) {
      return `${duration.seconds} Seconds Ago`;
    } else {
      return "";
    }
  }
  function renderConversation() {
    return (
      <div className="card" style={{ margin: "4%", borderRadius: "10px", cursor: "pointer", paddingLeft: "4%", paddingTop: "6.4%" }}>
        <div style={{ right: '10px', position: 'absolute' }}>
          <p style={{ fontSize: '13px' }}>{getDate(props.data.lastTime)}</p>
        </div>
        
        <div style={{marginBottom:"0"}}>
          <h3 style={{ marginBottom: "0" }}>{props.data.toName}</h3>
          <p>{props.data.lastMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div onClick={() => props.handleClick(props.data)}>
      {renderConversation()}
    </div>
  );
}

export default Conversation;
