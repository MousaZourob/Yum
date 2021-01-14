import React, { useRef, useEffect, useState } from "react";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import "./styles.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import ReactMapGL, { Marker, Layer } from "react-map-gl";
import ListingForm from "./listingform.component";

const Listing = (props) => {
  const data = props.data;
  const restrictions = JSON.parse(data.restrictions);
  var desc;
  var title;
  const [viewport, setViewport] = useState({});
  const [renderMap, setRenderMap] = useState(false);
  const [pos, setPos] = useState({});


  useEffect(() => {
    if (data.location) {
      console.log(data.location + "hi");
      const pos = JSON.parse(data.location);
      const { lat, lng } = pos.location;
      setViewport({
        latitude: lat,
        longitude: lng,
        zoom: 13,
      });
      setPos({
        lat: lat,
        lng: lng,
      });
      setRenderMap(true);
    } else {
      setRenderMap(false);
    }
  }, []);

  if (props.data.description.length > 130) {
    desc = data.description.substr(0, 130) + "...";
  } else {
    desc = data.description;
  }

  if (data.title.length > 70) {
    title = data.title.substr(0, 70);
  } else {
    title = data.title;
  }

  let name = data.name;
  const generateMap = () => {
    if (renderMap) {
      return (
        <ReactMapGL
          mapboxApiAccessToken={
            "pk.eyJ1IjoiYWJkdXJqIiwiYSI6ImNram5kMWw4ZDA3bjQycmw2bjgweWY0MHcifQ.-Tkna8SiS_3jWdgB_xji8Q"
          }
          {...viewport}
          width="100%"
          height="100%"
          onViewportChange={(viewport) => setViewport(viewport)}
        >
          <Marker latitude={pos.lat} longitude={pos.lng}>
            <img src="https://img.icons8.com/plumpy/24/000000/map-pin.png" />
          </Marker>
        </ReactMapGL>
      );
    }
  };

  async function deleteListing() {
    const res = await axios({
    method: 'delete',
    url: 'http://localhost:8000/listings/delete',
    validateStatus: null,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`
    },
    data: {
      _id: data._id
    }
  });
  window.location = ('/my_listings')
}

  async function editListing() {
    window.location = ('/edit_listing')
  }

  const renderEdits = () => {
    if (props.editable) {
      return (
        <div>
          <button
          onClick={editListing}
          class="btn"
          style={{ marginTop: "8%",backgroundColor: "#ccebff", textAlign: "center", width: "100%"}}
          >Edit</button>
          <button
          onClick={deleteListing}
          class="btn"
          style={{ marginTop: "8%",backgroundColor: "#ccebff", textAlign: "center", width: "100%"}}
          >Delete</button>
        </div>
      );
    }
  };

  const startChat = async () => {
    const newChat = await axios({
      method: "post",
      url: "http://localhost:8000/chat/newconvo",
      data: {
        contactID: data.user_id,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    window.location = `/chat?open=${newChat.data.roomID}`;
  };

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
                class="col-xs-2"
                style={{ width: "8%", height: "6%", borderRadius: "10px" }}
                src={`http://localhost:8000/images/get/${data.image}`}
                alt="Italian Trulli"
              ></img>

              <div
                class="col-sm-3"
                style={{
                  width: "28%",
                  marginTop: "1%",
                  marginLeft: "1%",
                  maxHeight: "inherit",
                }}
              >
                <h3
                  style={{
                    overflow: "hidden",
                    maxWidth: "100%",
                    padding: "1%",
                  }}
                >
                  {title}
                </h3>
                <p style={{ marginLeft: "1%" }}>
                  Donor: {name}
                  <br></br>
                </p>
              </div>

              <p
                class="col-sm-2.5"
                style={{
                  /*fontFamily: "monospace, courier-new",*/
                  marginLeft: "0.5%",
                  marginTop: "1%",
                  width: "28%",
                  textAlign: "justify",
                }}
              >
                {desc}
              </p>

              <div class="col-sm-3" style={{ marginTop: "1%" }}>
                <p
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    marginLeft: "14%",
                  }}
                >
                  Restrictions:
                </p>
                <ul
                  style={{
                    width: "100%",
                    columnCount: 3,
                    columnGap: 25,
                  }}
                >
                  {restrictions.map((restriction) => {
                    return <p class="tag">{restriction.label}</p>;
                  })}
                </ul>
              </div>
              <div class="col-sm-2" style={{marginLeft:"2%", borderRadius:"10px"}}>
                {generateMap()}
                </div>
            </div>
          </div>
        </div>
      }
      modal
      position="center"
      open={props.open}
    >
      {/*Specific Listing Info*/}
      {
        <div
          class="container"
          style={{
            padding: 10,
            
          }}
        >
          <div class="row" style={{ borderStyle: "solid", borderColor: "#A4A4A4", padding: 5, borderRadius: "10px" , margin: "0"}}>
            <div
              class="col-sm-6" 
              style={{
                width: "100%",
                borderRadius: "10px",
                padding: 5,
              }}
            >
              <h1 style={{ marginLeft: "1%"}}>{data.title}</h1>
            </div>
            <div class="col-sm-4" style={{width: "100%"}}>{generateMap()}</div>
            <div class="col-sm-2">{localStorage.getItem("jwt") &&
                jwt_decode(localStorage.getItem("jwt"))._id !== data.user_id ? (
                  <button class="btn" style={{backgroundColor: "#ccebff", textAlign: "center", width: "100%", marginTop:"15%"}} onClick={() => startChat()}>Chat</button>
                ) : renderEdits()}</div>
          </div>

          <div class="row" style={{ borderRadius: "10px", marginTop: ".42%" }}>
            {/*PIC*/}
            <div class="col-md-6">
              <img
                style={{ marginTop: "2%", width: "100%", height: "auto", borderRadius: "10px", objectFit: "fill" }}
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
                  borderStyle: "solid",
                  borderRadius: "10px",
                  marginTop: "2%",
                  paddingBottom: 0,
                  borderColor: "#A4A4A4",
                  height:"68%"
                }}
              >
                <p>{data.description}</p>
              </div>

              {/*RESTRICTIONS*/}
              <div
                class="row"
                style={{
                  padding: 10,
                  borderStyle: "solid",
                  borderRadius: "10px",
                  marginTop: "2.4%",
                  borderColor: "#A4A4A4",
                  height:"30%"
                }}
              > 
                <ul
                  style={{
                    columnCount: 3,
                    wordWrap: "break-word",
                    columnGap: 25,
                    paddingTop: 10,
                    overflow: "auto",
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
        </div>
      }
    </Popup>
  );
};
export default Listing;
