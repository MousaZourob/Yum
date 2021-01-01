import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import Register from "./components/register.component";
import Listings from "./components/listings.js";

function App() {
  /*
    The following lines can be moved into a new "Show Listings" page
  */
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
