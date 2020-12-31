import logo from "./logo.svg";
import "./App.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component";
import Register from "./components/register.component"

function App() {

  const createListing = (data, restrictions) => {
    //todo
  }

  return (
    <Router>
      <Navbar />
      <Listings createListing={this.createListing} />
      <br/>
      <Route path='/users/add' exact component={Register} />
    </Router>
    );
}

export default App;
