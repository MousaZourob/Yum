import React, { useRef, useEffect, useState } from "react";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import "./styles.css";
import ReactMapGL, { Marker, Layer } from "react-map-gl";

const Listing = (props) => {
  const data = props.data;
  const restrictions = JSON.parse(data.restrictions);
  var desc;
  var title;
  const [viewport, setViewport] = useState({});
  const [renderMap, setRenderMap] = useState(false);
  const [pos, setPos] = useState({});

  var location = "Place";

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

  const renderEdits = () => {
    if (props.editable) {
      return (
        <div>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      );
    }
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
                  {location}
                </p>
              </div>

              <p
                class="col-sm-3"
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
                <p style={{ textAlign: "center", fontWeight: "bold", marginLeft: "14%" }}>
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
            </div>
            {renderEdits()}
          </div>
        </div>
      }
      modal
      position="center"
    >
      {/*Specific Listing Info*/}
      {
        <div
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

              {generateMap()}

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
