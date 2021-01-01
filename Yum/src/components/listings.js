import axios from "axios";
import { useEffect, useState } from "react";
import Listing from "./listing.js";
import ListingForm from "./listingform.component";

const Listings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/listings/get").then((response) => {
      setListings(response.data);
    });
  }, []);

  return (
    <div>
      {listings.map((listing) => {
        return <Listing data={listing} />;
      })}
    </div>
  );
};

export default Listings;
