import React from "react";
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import "./styles.css";



const Listing = (props) => {
  const data = props.data;
  const restrictions = JSON.parse(data.restrictions);

  return (

    <Popup className="listing"
      trigger={<div style={{ cursor: "pointer", margin: 24, boxShadow: "5px 5px 5px #d9d9d9" }}>


        {/*Basic Listing Info*/}
        <div class="card w-400" style={{}}>
          <div class="card-body">
            <h1>{data.title}</h1>
          </div>
        </div>
      </div>}

      modal
      position="center">


      {/*Specific Listing Info*/}
      <div class="grid-container" style={{
        padding: 10,
        display: "grid",
        gridGap: "20px",
        gridTemplateRows: "60px 280px 88px",
        gridTemplateColumns: "200px 200px 200px",
        width: "100%"
      }}
      >
        <div style={{ background: "#cccccc", gridColumn: "1/5", padding: 5, borderRadius: "10px" }}><h1>{data.title}</h1></div>
        <div style={{ background: "black", gridColumn: "1/3", gridRow: "2/4", color: "white", borderRadius: "10px" }}><img style={{ width: "420px", height: "388px" }} src="https://hips.hearstapps.com/del.h-cdn.co/assets/18/07/1518705462-80-chicken-mcnugget-happy-meal.jpg" alt="Italian Trulli"></img></div>
        <div style={{ background: "#cccccc", gridRow: "2", gridColumn: "3/5", padding: "20px", borderRadius: "10px" }}><p>{data.description}</p></div>
        <div style={{ gridRow: "3", gridColumn: "3/5", padding: 10, background: "#cccccc", borderRadius: "10px" }}>
          <ul style={{ columnCount: 3, position: "center" }}>
          {restrictions.map((restriction) => {
            return (
              <li>
                <p>{restriction.label}</p>
              </li>
            );
          })}
        </ul>
      </div>
      </div>
    </Popup >




  );
};



export default Listing;

