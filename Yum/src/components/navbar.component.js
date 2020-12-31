import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-primary navbar-expand-lg .text-white font-weight-bold font">
        <Link to="/" className="navbar-brand">YUM</Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">View Listings</Link>
            </li>

          </ul>
          <ul className="navbar-nav navbar-right">
            <li className="navbar-item">
              <Link to="/users/add" className="nav-link ml-auto">Register</Link>
            </li>
            <li className="navbar-item">
              <Link to="/login" className="nav-link ml-auto">Login</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}