import React from "react";

const Listing = (props) => {
  const data = props.data;
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <ul>
        <li>{data.di_re}</li>
      </ul>
    </div>
  );
};

export default Listing;
