import React, { useState, useEffect } from "react";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import "./styles.css";
import axios from "axios";

const Listing = (props) => {
  const data = props.data;
  const restrictions = JSON.parse(data.restrictions);
  const post_code = data.location;
  var desc;
  var title;

  var location = "Alley Behind Wendy's";

  if (props.data.description.length > 400) {
    desc = data.description.substr(0, 353) + "...";
  } else {
    desc = data.description;
  }

  if (data.title.length > 70) {
    title = data.title.substr(0, 70);
  } else {
    title = data.title;
  }

  //const [location, setLocation] = useState();

  useEffect(() => {
    console.log("sent request" + data.location);
    axios({
      method: "post",
      url: "http://localhost:8000/listing/location",
      data: { post_code },
    });
  }, []);

  let name = data.name;

  return (
    <Popup
      className="listing"
      trigger={
        <div
          style={{
            cursor: "pointer",
            margin: 24,
            boxShadow: "5px 5px 5px #d9d9d9",
          }}
        >

          {/*Basic Listing Info*/}
          <div class="card w-400">
            <div class="card-body" style={{ display: "flex" }}>
              <img
                style={{ width: "8%", height: "6%", borderRadius: "10px" }}
                src={`http://localhost:8000/images/get/${data.image}`}
                alt="Italian Trulli"
              ></img>

              <div style={{ width: "28%", marginTop: "1%", marginLeft: "1%" }}>
                <h3 style={{/*background: "grey", */


                  overflow: "hidden",
                  maxWidth: "100%",
                  padding: "1%"
                }}>{title}</h3>
                <p style={{ marginLeft: "1%" }}>
                  Donor: {name}
                  <br></br>
                  {location}
                </p>
              </div>

              <p style={{
                /*background: "lightblue",*/
                /*fontFamily: "monospace, courier-new",*/
                marginLeft: "0.5%",
                marginTop: "1%",
                width: "28%",
              }}>{desc}</p>

              <div style={{marginTop: "1%", marginLeft: "1%" }}>

                <p style={{ textAlign: "center",fontWeight:"bold" }}>Restrictions:</p>
                <ul style={{columnCount: 3, wordWrap: "break-word", columnGap: 25, margin: "4%" }}>
                  {restrictions.map((restriction) => {
                    return (
                      <p class="tag">{restriction.label}</p>
                    );
                  })}

                </ul></div>

            </div>
          </div>
        </div >
      }
      modal
      position="center"
    >
      {/*Specific Listing Info*/}
      < div
        class="container"
        style={{
          padding: 10,
          width: "100%",
        }}
      >
        <div class="row" style={{ padding: 5, borderRadius: "10px" }}>
          <div
            style={{
              background: "#cccccc",
              width: "100%",
              borderRadius: "10px",
              padding: 5,
            }}
          >
            <h1 style={{ marginLeft: "1%" }}>{data.title}</h1>
          </div>
        </div>

        <div class="row" style={{ borderRadius: "10px", marginTop: ".42%" }}>

          {/*PIC*/}
          <div class="col-md-6">
            <img
              style={{ width: "100%", height: "100%", borderRadius: "10px" }}
              src={`http://localhost:8000/images/get/${data.image}`}
              alt="Italian Trulli"
            ></img>
          </div>

          <div class="col-6" style={{ paddingRight: 24 }}>
            {/*DESCRIPTION*/}
            <div
              class="row"
              style={{
                padding: 10,
                background: "#cccccc",
                borderRadius: "10px",
                marginTop: "2%",
                paddingBottom: 0,
              }}
            >
              <p>{data.description}</p>
            </div>

            {/*RESTRICTIONS*/}
            <div
              class="row"
              style={{
                padding: 10,
                background: "#cccccc",
                borderRadius: "10px",
                marginTop: "2.4%",
              }}
            >
              <ul
                style={{
                  columnCount: 3,
                  wordWrap: "break-word",
                  columnGap: 25,
                  paddingTop: 10,
                  overflow: "auto"
                }}
              >
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
        </div>
      </div >
    </Popup >
  );
};
export default Listing;
