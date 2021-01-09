import React, { Component } from "react";
import { Link } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import { useForm } from "react-hook-form";
import ListingForm from "./listingform.component";
import jwt_decode from "jwt-decode";
import "./styles.css";

function LogOut(props) {
  localStorage.removeItem("jwt");
  window.location = (`/listings`);
}

function UserGreeting(props) {
  return (
    <div className="collpase navbar-collapse">
      <ul className="navbar-nav mr-auto">
        <li className="navbar-item">
          <Link to="/listings" className="nav-link" style={{ color: "white" }}>
            View Listings
          </Link>
        </li>
        <li className="navbar-item">
          <Link
            to="/my_listings"
            params={localStorage.getItem("jwt")}
            className="nav-link"
          >
            My Listings
          </Link>
        </li>
        <li className="navbar-item">
          <Link
            to="/chat"
            params={localStorage.getItem("jwt")}
            className="nav-link"
          >
            Chat
          </Link>
        </li>
      </ul>
      <ul className="navbar-nav navbar-right">
        <li className="navbar-brand">
          Hello {jwt_decode(localStorage.getItem("jwt")).name}
        </li>
        <li className="navbar-item">
          <Popup
            trigger={
              <div
                style={{ cursor: "pointer" }}
                className="nav-link font-weight-bold"
              >
                {" "}
                Create Listing
              </div>
            }
            modal
            position="center"
          >
            <div>
              <ListingForm />
            </div>
          </Popup>
        </li>
        <li className="navbar-item">
          <Link
            to="/listings"
            className="nav-link ml-auto"
            style={{ color: "white" }}
            onClick={LogOut}
          >
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

function GuestGreeting(props) {
  return (
    <div className="collpase navbar-collapse">
      <ul className="navbar-nav mr-auto">
        <li className="navbar-item">
          <Link to="/listings" className="nav-link" style={{ color: "white" }}>
            View Listings
          </Link>
        </li>
      </ul>
      <ul className="navbar-nav navbar-right">
        <li className="navbar-item">
          <Link
            to="/users/add"
            className="nav-link ml-auto"
            style={{ color: "white" }}
          >
            Register
          </Link>
        </li>
        <li className="navbar-item">
          <Link
            to="/users/login"
            className="nav-link ml-auto"
            style={{ color: "white" }}
          >
            Login
          </Link>
        </li>
      </ul>
    </div>
  );
}

function Greeting(props) {
  if (
    localStorage.getItem("jwt") &&
    jwt_decode(localStorage.getItem("jwt")).name
  ) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark navbar-expand-lg .text-white font-weight-bold background">
        <Link to="/home" className="navbar-brand">
          <h3 style={{ fontWeight: "bold" }}>YUM</h3>
        </Link>
        <div className="collpase navbar-collapse">
          <Greeting />
        </div>
      </nav>
    );
  }
}
