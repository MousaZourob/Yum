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

    {/*This check actually gets everything working and I have no clue why*/}
    if(listings.length<=0) {
        return <div>An Error Occured</div>
    }

    return (
        <div>
            <h1 style={{ textAlign: "center", fontFamily: "Helvetica, sans-serif", margin:"2%" }}>Recent Listings</h1>
            <Carousel style={{width:"80%", left: "10%"}}>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={`http://localhost:8000/images/get/${listings[18].image}`}
                        alt="Third slide"
                    />
                    <Carousel.Caption style={{ color: "black" }}>
                        <h3>{listings[0].title}</h3>
                        <p style={{fontWeight: "bold"}}>Kindly Donated By: {listings[0].name}</p>
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
                        <p style={{fontWeight: "bold"}}>Kindly Donated By: {listings[1].name}</p>
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
                        <p style={{fontWeight: "bold"}}>Kindly Donated By: {listings[2].name}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>


            <div>
                <p>Description paragraph</p>
            </div>

        </div>

    )
}

export default Home;
