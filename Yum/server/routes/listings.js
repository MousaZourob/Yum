const Mongoose = require('mongoose')
const router = require('express').Router();
let Listing = require('../models/listing.model');
const jwt = require('express-jwt');

router.get("/get", (req, res) => {
  console.log("Listing requested");
  Listing.find()
    .then((listings) => res.json(listings))
    .catch((err) => res.status(400).json("Error: " + err));

  console.log("Listings Found");
});

router.post("/add", jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }), (req, res) => {
    if (!req.body.title || !req.body.description || !req.body.restrictions) {
      res.status(400).send({ error: "Not all fields were complete" })
    }

    if (!validateJSON(req.body.restrictions)) {
      res.status(400).send({ error: "Restrictions was invalid JSON"});
    }

    const newListing = new Listing({
      user_id: req.user._id,
      name: req.user.name,
      title: req.body.title,
      description: req.body.description,
      restrictions: req.body.restrictions,
      location: validateJSON(req.body.location) ? req.body.location : "",
      image: req.body.image ? req.body.image : "404.png",
    });

    //Save new listing into database
    newListing.save()
      .then((listing) => res.status(200).send({ _id: listing._id.toString() }))
      .catch((err) => res.status(400).json("Error: " + err));
    
      console.log("New listing added");
  }
);

router.put('/update/:id', jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }), (req, res) => {
  if (!req.body.title || !req.body.description || !req.body.restrictions) {
    res.status(400).send({ error: "Not all fields were filled" });
    return;
  }

  if (!validateJSON(req.body.restrictions)) {
    res.status(400).send({ error: "Restrictions was invalid JSON" });
    return;
  }
  Listing.findById(req.params.id)
    .then(listing => {
      if (!listing) {
        res.status(400).send({ error: 'Listing does not exist' });
        return;
      }
      listing.title = req.body.title,
      listing.description = req.body.description,
      listing.restrictions = req.body.restrictions,
      listing.location = req.body.location,
      listing.image = req.body.image ? req.body.image : "404.png"

      listing.save()
        .then(() => res.status(200).send({ _id: listing._id.toString() }))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));

  console.log("Listing updated");
}
);

router.delete('/delete', jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }), (req, res) => {
  if (!req.body._id) {
    res.status(400).send({ error: "No listing ID was provided"});
    return;
  }
    Listing.deleteOne({"user_id": req.user._id, "_id": Mongoose.Types.ObjectId(req.body._id)})
    .then(() => res.json('Listing deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

function validateJSON(jsonString) {
  try {
    let data = JSON.parse(jsonString);
    if (data && typeof data === "object") {
      return true;
    }
  } catch (e) { }
  return false;
}
module.exports = router;
