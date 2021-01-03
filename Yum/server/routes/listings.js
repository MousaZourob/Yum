const express = require('express');
let Listing = require('../models/listing.model');
const router = express.Router();

router.route('/get').get((req, res) => {
    console.log("Listing requested");
    Listing.find()
        .then(listings => res.json(listings))
        .catch(err => res.status(400).json('Error: ' + err));

    console.log("Listings Found")
});

router.route('/add').post((req, res) => {
    const newListing = new Listing({
        user_id: "",
        name: req.body.name,
        title: req.body.title,
        description: req.body.description,
        restrictions: req.body.restrictions,
        location: req.body.location,
        image: req.body.description,
    });
    
    //Save new listing into database
    newListing.save() 
    .then(() => res.json('Listing added!'))
    .catch(err => res.status(400).json('Error: ' +err));

    console.log("New listing added");
});

module.exports = router;