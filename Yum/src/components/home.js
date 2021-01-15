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
            <h1 style={{ textAlign: "center", margin: "2%" }}><i>"One man's trash is another man's treasure"</i></h1>
            <h2 style={{ textAlign: "center", margin: "2%" }}>Recent Donations</h2>
            <Carousel style={{ width: "80%", left: "10%", background: "lightgrey" }}>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={`http://localhost:8000/images/get/${listings[0].image}`}
                        alt="Third slide"
                    />
                    <Carousel.Caption style={{ color: "black" }}>
                        <div style={{ background: "white", borderRadius: "10px", opacity: "0.9", paddingTop: "1%" }}>
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
                        <div style={{ background: "white", borderRadius: "10px", opacity: "0.9", paddingTop: "1%" }}>
                            <h3>{listings[1].title}</h3>
                            <p style={{ fontWeight: "bold" }}>Kindly Donated By: {listings[1].name}</p>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={`http://localhost:8000/images/get/${listings[2].image}`}
                        alt="Third slide"
                    />
                    <Carousel.Caption style={{ color: "black" }}>
                        <div style={{ background: "white", borderRadius: "10px", opacity: "0.9", paddingTop: "1%" }}>
                            <h3>{listings[2].title}</h3>
                            <p style={{ fontWeight: "bold" }}>Kindly Donated By: {listings[2].name}</p>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <h2 style={{ marginTop: "2%", textAlign: "center", marginBottom: "1%" }}>Our Mission</h2>
            <h5 style={{ fontWeight: "lighter", paddingLeft: "10%", paddingRight: "10%", paddingBottom: "50px", textAlign: "justify" }}>
                Yum is a responsive web application built with the MERN stack that allows users to donate excess food and reduce food waste. <b>Did you know that roughly one-third of the food produced in the world for human consumption every year (approximately 1.3 billion tonnes) gets lost or wasted?</b> That is perfectly good food that is thrown away due to imperfections in shape and colour. Yum aims to change this by allowing both individuals and establishments to donate their excess food.
            <br />
                <br />
            </h5>

        </div>

    )
}

export default Home;
