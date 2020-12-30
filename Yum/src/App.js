import React, { Component } from "react";
import Listings from "./components/listings.js";
import Listing from "./components/listing.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [
        { title: "food1", description: "test1", di_re: "a" },
        { title: "food2", description: "tes2", di_re: "b" },
        { title: "food3", description: "test3", di_re: "c" },
      ],
    };
  }
  createListing = (data) => {
    let listings = [...this.state.listings];
    listings.push(data);
    this.setState(listings);
  };

  render() {
    return (
      <div className="App">
        <Listings createListing={this.createListing} />
        <Listing data={this.state.listings[0]} />
        <Listing data={this.state.listings[1]} />
        <Listing data={this.state.listings[2]} />
      </div>
    );
  }
}

export default App;
