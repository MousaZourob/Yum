const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.route('/get').get((req, res) => {
    console.log("Users requested");
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));

    console.log("Users Found")
});

router.route('/add').post(async (req, res) => {

    //hash the password, we store the hash
    const saltRounds = 10;
    const hash = bcrypt.hashSync(req.body.password, saltRounds);

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash

    });
    
    try {
        //Save new user into database
        await newUser.save();
        // Sign JWT token and send to client
        res.status(200).send({
            jwt: jwt.sign({ name: req.body.name, email: req.body.email }, process.env.JWT_SECRET)
        });
        console.log("New user added");
    } catch (err) {
        console.log("Failed to add new user", err);
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;