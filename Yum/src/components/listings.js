import axios from "axios";
import { useEffect, useState } from "react";
import Listing from "./listing.js";
import ListingForm from "./listingform.component";

const Listings = (props) => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/listings/get").then((response) => {
      setListings(response.data);
    });
  }, []);

  const renderListings = () => {
    if (props.userId) {
      listings
        .filter((listing) => listing.data.userId == props.userId)
        .map((listing) => {
          return <Listing data={listing} />;
        });
    } else {
      listings.map((listing) => {
        return <Listing data={listing} />;
      });
    }
  };

  return { renderListings };
};

export default Listings;
