const router = require('express').Router();
// const User = require('../models/user');
const User = require('../models/user');
const db = require('../db')
const jwt = require("jsonwebtoken");

router.post('/create', function (req, res) {

    User.create({
        // user_id: res.body.user.user_id,
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        email: req.body.user.email,
        password: req.body.user.password,
        adminCheck: req.body.user.adminCheck
    })
    .then(
        function createSuccess(user) {
            let token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
            
            res.json({
                user: user,
                message: 'User successfully created! Woofuckinhoo!!',
                sessionToken: token
            });
        }
    )
    .catch(err => res.status(500).json({ error: err }))
});

router.post('/login', function(req, res) {

    User.findOne({
        where: {
            email: req.body.user.email
        }
    })
    .then(function loginSuccess(user) {
        if (user) {
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})

            res.status(200).json({
                user: user,
                message: "Ayeee bub! Welcome back!!",
                sessionToken: token
            })
        } else {
            res.status(500).json({ error: 'User does not exist.'})
        }
    })
    .catch(err => res.status(500).json({ error: err }))
});

module.exports = router;