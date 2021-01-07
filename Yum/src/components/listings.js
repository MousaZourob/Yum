import axios from "axios";
import { useEffect, useState } from "react";
import Listing from "./listing.js";
import ListingForm from "./listingform.component";
import jwt_decode from "jwt-decode";

const Listings = (props) => {
  const [listings, setListings] = useState([]);
  let userId;
  if(localStorage.getItem("jwt")) {
    userId = jwt_decode(localStorage.getItem("jwt"))._id;
  } 
 

  useEffect(() => {
    axios.get("http://localhost:8000/listings/get").then((response) => {
      setListings(response.data);
    });
  }, []);

  function renderListings() {
    if (props.userId === undefined) {
      return listings.map((listing) => {
        return <Listing data={listing} />;
      });
    } else {
      return listings
        .filter((listing) => listing.data.user_id === props.userId)
        .map((listing) => {
          return <Listing data={listing} />;
        });
    }
  }

  return <div>{renderListings()}</div>;
};

export default Listings;
