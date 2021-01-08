import axios from "axios";
import { useEffect, useState } from "react";
import Listing from "./listing.js";
import ListingForm from "./listingform.component";
import jwt_decode from "jwt-decode";

const Listings = (props) => {
  const [listings, setListings] = useState([]);
  const [position, setPosition] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8000/listings/get").then((response) => {
      setListings(response.data);
    });
    const geo = navigator.geolocation;
    if (geo) {
      setPosition(geo.getCurrentPosition(() => {}));
    }
  }, []);

  function renderListings() {
    if (props.user_id === undefined) {
      return listings.map((listing) => {
        return <Listing data={listing} />;
      });
    } else {
      return listings
        .filter((listing) => listing.user_id === jwt_decode(props.user_id)._id)
        .map((listing) => {
          console.log(JSON.parse(listing.location));
          return <Listing data={listing} editable={true} />;
        });
    }
  }

  return <div>{renderListings()}</div>;
};

export default Listings;
