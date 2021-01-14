import React from "react";
import { useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./styles.css";
import axios from "axios"

function Home() {

    const [listings, setListings] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/listings/get").then((response) => {
            setListings(response.data);
        });
    }, []);

    {/*This check actually gets everything working and I have no clue why*/ }
    if (listings.length <= 0) {
        return <div>An Error Occured</div>
    }

    return (
        <div>
            <h1 style={{ textAlign: "center", margin: "2%" }}>Recent Donations</h1>
            <Carousel style={{ width: "80%", left: "10%", background: "lightgrey" }}>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={`http://localhost:8000/images/get/${listings[0].image}`}
                        alt="Third slide"
                    />
                    <Carousel.Caption style={{ color: "black" }}>
                        <div style={{ background: "white", borderRadius:"10px",opacity: "0.9", paddingTop:"1%" }}>
                            <h3>{listings[0].title}</h3>
                            <p style={{ fontWeight: "bold" }}>Kindly Donated By: {listings[0].name}</p>
                        </div>

                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={`http://localhost:8000/images/get/${listings[1].image}`}
                        alt="Third slide"
                    />
                    <Carousel.Caption style={{ color: "black" }}>
                        <h3>{listings[1].title}</h3>
                        <p style={{ fontWeight: "bold" }}>Kindly Donated By: {listings[1].name}</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={`http://localhost:8000/images/get/${listings[2].image}`}
                        alt="Third slide"
                    />
                    <Carousel.Caption style={{ color: "black" }}>
                        <h3>{listings[2].title}</h3>
                        <p style={{ fontWeight: "bold" }}>Kindly Donated By: {listings[2].name}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <h1 style={{ marginTop: "2%", textAlign: "center" }}>Our Mission</h1>
            <h5 style={{ fontWeight: "lighter" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </h5>

        </div>

    )
}

export default Home;
