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
    // verify that request is valid
    if (!req.body.name || !req.body.email || !req.body.password) {
        res.status(400).send({ error: 'Not all fields were complete' });
        return;
    }
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

router.route('/login').post(async (req, res) => {
    // verify that request is valid
    if (!req.body.email || !req.body.password) {
        res.status(400).send({ error: 'Not all fields were complete' });
        return;
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.status(401).send({ error: 'User does not exist'});
        return;
    }

    // Check if passsword is valid
    if (bcrypt.compareSync(req.body.password, user.password)) {
        // Sign JWT token and send to client
        res.status(200).send({
            jwt: jwt.sign({ name: user.name, email: user.email }, process.env.JWT_SECRET)
        });
    } else {
        res.status(401).send({ error: 'Password incorrect' });
    }
});

module.exports = router;