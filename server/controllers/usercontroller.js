const router = require('express').Router();
const User = require('../models/user');
const db = require('../db')
const jwt = require("jsonwebtoken");

const bcrypt = require('bcryptjs');

//create
router.post('/create', function (req, res) {

    User.create({
        // user_id: res.body.user.user_id,
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 13),
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


// login
router.post('/login', function(req, res) {
    
    User.findOne({
        where: {
            email: req.body.user.email
        }
    })
    .then(function loginSuccess(user) {
        if (user) {
            bcrypt.compare(req.body.user.password, user.password, function (err, matches) {
                if(matches) {
                    let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})
                    
                    res.status(200).json({
                        user: user,
                        message: "Ayeee bub! Welcome back!!",
                        sessionToken: token
                    })
                } else {
                    res.status(502).send({ error: "Login Failed >:("});
                }
            })
        } else {
            res.status(500).json({ error: 'User does not exist.'})
        }
    })
    .catch(err => res.status(500).json({ error: err }))
});

//get user
router.get('/getuserinfo', (req, res) => {
    User.findOne({
        where: {
            userId: req.user.id
        }
    })
    .then(function createSuccess(data) {
        res.status(200).json({
            message: 'I gotchu, fam',
            data: data
        })
    }).catch(err => res.status(500).json('Woah woah woah wait, who are we talking about?', err))
})

module.exports = router;