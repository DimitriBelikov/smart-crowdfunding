const express = require('express');
const router = express.Router();

//User model
const User = require('../models/User');

//Get all Users
router.get('/', (req, res) => {
    User.find().then(
        users => res.json(users)
    ).catch(
        err => console.log("Error while getting users: " + err)
    );
});

//Create a new User
router.post('/', (req, res) => {
    console.log(req.body);
    const {userName, password, fullName, dob, emailId, currentCity, state} = req.body;
    const user = new User({
        userName,
        password,
        fullName,
        dob,
        emailId,
        currentCity,
        state
    });

    user.save().then(
        userObject => {
            console.log('--> New User Created. Document Saved on Database.');
            res.json(userObject);
        }
    ).catch(
        err => console.log("Error while creating new User: " + err)
    );
});



module.exports = router;