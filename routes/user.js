const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');
require('dotenv').config({ path: __dirname + '/.env' })
const multer = require('multer');
const upload = multer();

//User model
const User = require('../models/User');

// GET('/') - Get List of all Users
router.get('/', (req, res) => {
    User.find().then(users =>
        res.status(200).json(users)
    ).catch(error =>
        res.status(400).json({ msg: "Error while getting users: " + error })
    );
});


// POST('/') - Create A New User
router.post('/', upload.any(), (req, res) => {
    const { userName, password, fullName, dob, emailId, currentCity, state } = req.body;

    console.log(req.body);
    // res.status(200).json({msg: "Done"});
    // if(!userName || !emailId || !password){
    //     res.status(400).json({ msg: "Please enter all fields" });
    // }

    User.findOne({ userName }).then(user => {
        if (user) return res.status(400).json({ msg: "Username already exists" });
    });

    User.findOne({ emailId }).then(user => {
        if (user) return res.status(400).json({ msg: "User with email already exists" });
        const newUser = new User({
            userName,
            password,
            fullName,
            dob: new Date(dob),
            emailId,
            currentCity,
            state
        });

        bcrypt.genSalt(parseInt(process.env.SALT), (error, salt) => {
            if (error) {
                console.log('Bcrypt Error: Error Creating Salt');
                return res.status(500).json({ msg: "Error while adding user to Database" + error });
            }
            bcrypt.hash(newUser.password, salt, (error, hash) => {
                if (error) {
                    console.log('Bcrypt Error: Error Generating Hash');
                    return res.status(500).json({ msg: "Error while adding user to Database: " + error });
                }
                newUser.password = hash;
                newUser.save().then(user => {
                    console.log('--> New User Created. Document Saved on Database.');
                    return res.status(200).json(user);
                }).catch(error =>
                    res.status(500).json({ msg: "Error while adding user to Database: " + error })
                );
            })
        });
    }).catch(
        error => res.status(400).json({ msg: "Error while creating new User: " + error })
    );
});


// GET('/:id') - Get a Particular User's Details
router.get('/:id', (req, res) => {
    User.findById(req.params.id).then(user => {
        res.status(200).json(user);
    }).catch(
        error => res.status(400).json({ msg: 'Cannot Find User Details: ' + error })
    );
});


// PUT('/:id') - Update a Particular User Details
router.put('/:id', upload.any(), (req, res) => {
    const { userName, password, fullName, dob, emailId, currentCity, state } = req.body;

    const updatedUser = {
        userName,
        password,
        fullName,
        dob: new Date(dob),
        emailId,
        currentCity,
        state
    }

    User.findById(req.params.id).then(user => {
        User.findOne({ userName }).then(user2 => {
            if (user2 === null || user._id.toString() === user2._id.toString()) {
                User.findByIdAndUpdate(req.params.id, updatedUser, { returnDocument: 'after' }, (error, response) => {
                    if (error) res.status(400).json({ msg: 'Error Updating User Details: ' + error });
                    return res.status(200).json(response);
                });
            }
            else {
                return res.status(400).json({ msg: "User with UserName already exists" });
            }
        });
    });
});


// DELETE('/:id') - Delete a Particular User
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id, { returnDocument: 'after' }, (error, response) => {
        if (error) res.status(400).json({ msg: 'Error Deleting User: ' + error });
        res.status(200).json(response);
    });
});


// POST('/login') - Login a User
router.post('/login', upload.any(), (req, res) => {
    const { emailId, password } = req.body;
    if (!emailId || !password) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }

    User.findOne({ emailId }).then(user => {
        if (!user) res.status(400).json({ msg: "User does not exist" });

        bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch) res.status(400).json({ msg: "Invalid credentials" });

            jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET, (error, token) => {
                if (error) res.status(400).json({ msg: "Error while creating JWT: " + error });
                let options = {
                    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
                    httpOnly: false, // The cookie only accessible by the web server
                }

                res.cookie('jwt', token, options);
                return res.status(200).json({ msg: "Cookie Generated" });
            })
        }).catch(error => res.status(400).json({ msg: "Error in login: " + error }))
    }).catch(error => res.status(400).json({ msg: "Error in login: " + error }));
})


// POST('/logout') - Logout a User
router.post('/logout', (req, res) => {
    res.clearCookie('jwt');
    res.status(200).json({ msg: "Cookie Deleted" });
})

// GET('/trial') - Trial Route for Testing
router.get('/trial', (req, res) => {

})

module.exports = router;