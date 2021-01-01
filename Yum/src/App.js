import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import Register from "./components/register.component";
import Login from "./components/login.component";
import Listings from "./components/listings.js";




function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path="/users/add" exact component={Register} />
      <Route path="/users/login" exact component={Login} />
      <Route path="/listings/add" exact component={Listings} />
    </Router>
  );
}

export default App;
