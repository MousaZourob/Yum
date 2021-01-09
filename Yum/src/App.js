import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import Register from "./components/register.component";
import Login from "./components/login.component";
import Listings from "./components/listings.js";
import ListingForm from "./components/listingform.component";
import Home from "./components/home";
import MessagePage from "./components/messages/message-page.component";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path="/users/add" exact component={Register} />
      <Route path="/users/login" exact component={Login} />
      <Route path="/listings/add" exact component={ListingForm} />
      <Route path="/listings" exact component={Listings} />
      <Route path="/my_listings">
        <Listings user_id={localStorage.getItem("jwt")} />
      </Route>
      <Route path="/chat">
        <MessagePage />
      </Route>
    </Router>
  );
}

export default App;
