import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'reactjs-popup/dist/index.css';
//import Listings from "./components/listings.js";
import Popup from 'reactjs-popup';
import Listings from './listings';


export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-primary navbar-expand-lg font-weight-bold">
        <Link to="/" className="navbar-brand">YUM</Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">View Listings</Link>
            </li>
            <li className="navbar-item">
              <Link to="/listings/add" className="nav-link">Create Listing</Link>
            </li>
          </ul>
          <ul className="navbar-nav navbar-right">
            <li className="navbar-item">
              <Link to="/users/add" className="nav-link ml-auto">Register</Link>
            </li>
            <li className="navbar-item">
              <Link to="/users/login" className="nav-link ml-auto">Login</Link>
            </li>
            <li className="navbar-item">
              <Popup
                trigger={<button className="btn btn-primary font-weight-bold"> Create Listing</button>}
                modal
                position="center">
                <div>test</div>
              </Popup>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}