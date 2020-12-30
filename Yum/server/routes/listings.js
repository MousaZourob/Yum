const express = require('express');
let Listing = require('../models/listing.model');
const router = express.Router();

router.route('/get').get((req, res) => {
    console.log("Listing requested");
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));

    console.log("Users Found")
});

router.route('/add').post((req, res) => {

    //hash the password, we store the hash
    const saltRounds = 10;
    const hash = bcrypt.hashSync(req.body.password, saltRounds);

    const newListing = new Listing({
        username: req.body.username,
        title: req.body.title,
        description: req.body.description,
        image: req.body.description,
        password: hash

    });
    
    //Save new listing into database
    newListing.save() 
    .then(() => res.json('Listing added!'))
    .catch(err => res.status(400).json('Error: ' +err));

    console.log("New listing added");
});

module.exports = router;