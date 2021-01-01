import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect, useState } from "react";

import Navbar from "./components/navbar.component";
import Register from "./components/register.component";
import Listings from "./components/listings.js";

function App() {
  const { listings, setListings } = useState([]);

  useEffect(() => {
    let temp = [];
    axios.get("http://localhost:8000/listings/get").then((response) => {
      temp = response.data;
    });
    setListings(temp);
  });

  return (
    <Router>
      <Navbar />
      <Listings />
      <br />
      <Route path="/users/add" exact component={Register} />
    </Router>
  );
}

export default App;
