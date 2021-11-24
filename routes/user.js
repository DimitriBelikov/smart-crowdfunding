const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const cookie = require('cookie-parser');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');
require('dotenv').config({ path: __dirname + '/.env' })

//User model
const User = require('../models/User');

// GET('/') - Get List of all Users
router.get('/', (req, res) => {
    User.find().then(users => 
        res.status(200).json(users)
    ).catch(err => 
        res.status(400).json({msg: "Error while getting users"})
    );
});


// POST('/') - Create A New User
router.post('/', (req, res) => {
    const {userName, password, fullName, dob, emailId, currentCity, state} = req.body;
    if(!userName || !emailId || !password){
        res.status(400).json({ msg: "Please enter all fields" });
    }
    
    User.findOne({userName}).then( user => { 
        if (user) res.status(400).json({ msg: "Username already exists" });
    });

    User.findOne({emailId}).then(user => {
        if(user) res.status(400).json({ msg: "User with email already exists" });
        
        const newUser = new User({
            userName,
            password,
            fullName,
            dob,
            emailId,
            currentCity,
            state
        });
    
        bcrypt.genSalt(parseInt(process.env.SALT), (err, salt) => {
            if(err) {
                console.log('Bcrypt Error: Error Creating Salt');
                res.status(500).json({ msg: "Error while adding user to Database"});
            }
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) {
                    console.log('Bcrypt Error: Error Generating Hash');
                    res.status(500).json({ msg: "Error while adding user to Database"});
                }
                newUser.password = hash;
                newUser.save().then(user => {
                    console.log('--> New User Created. Document Saved on Database.');
                    res.status(200).json(user);
                }).catch(err => 
                    res.status(500).json({ msg: "Error while adding user to Database"})
                );
            })
        });
    }).catch(
        err => console.log("Error while creating new User: " + err)
    );
});


// GET('/:id') - Get a Particular User's Details



// PUT('/:id') - Update a Particular User Details



// DELETE('/:id') - Delete a Particular User



// POST('/login') - Login a User
router.post("/login", (req, res) => {
    const { emailId, password } = req.body;
    if(!emailId || !password){
        res.status(400).json({ msg: "Please enter all fields" });
    }

    User.findOne({emailId}).then( user => {
        if(!user) res.status(400).json({ msg: "User does not exist" });

        bcrypt.compare(password, user.password).then(isMatch => {
            if(!isMatch) res.status(400).json({ msg: "Invalid credentials" });

            jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET, (err, token) => {
                if(err) res.status(400).json({ msg: "Error while creating JWT" });
                
                console.log("JWT Token: " + token + "\nUser: " + user);
                let options = {
                    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
                    httpOnly: true, // The cookie only accessible by the web server
                }

                res.cookie('jwt', token, options);
                res.status(200).json({ msg: "Cookie Generated" });
            })
        }).catch(err => res.status(400).json({ msg: "Error in login" }))
    }).catch(err => res.status(400).json({ msg: "Error in login" }));
})


// POST('/logout') - Logout a User
router.post("/logout", (req, res) => {
    res.clearCookie('jwt');
    res.status(200).json({ msg: "Cookie Deleted" });
})

//Trials
router.get("/trial", (req, res) => {
    
})

module.exports = router;