const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcrypt');

router.route('/get').get((req, res) => {
    console.log("Users requested");
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));

    console.log("Users Found")
});

router.route('/add').post((req, res) => {

    //hash the password, we store the hash
    const saltRounds = 10;
    const hash = bcrypt.hashSync(req.body.password, saltRounds);

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash

    });
    
    //Save new user into database
    newUser.save() 
    .then(() => res.json('User Added!'))
    .catch(err => res.status(400).json('Error: ' +err));

    console.log("New user added");
});

module.exports = router;