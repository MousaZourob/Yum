import React from "react";

const Listing = (props) => {
  const data = props.data;
  const restrictions = JSON.parse(data.restrictions);
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <ul>
        {restrictions.map((restriction) => {
          return (
            <li>
              <p>{restriction.label}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Listing;
