const router = require('express').Router();
const User = require('../models/user');
const db = require('../db')
const jwt = require("jsonwebtoken");
const { roles } = require('../duties')

const bcrypt = require('bcryptjs');

//create
router.post('/create', function (req, res) {

    User.create({
        // user_id: res.body.user.user_id,
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 13),
        role: req.body.user.role,
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
            email: req.body.user.email,
            // password: req.body.user.password
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
// router.get('/getuserinfo', (req, res) => {
//     User.findOne({
//         where: {
//             userid: req.user.id
//         }
//     })
//     .then(function createSuccess(data) {
//         res.status(200).json({
//             message: 'I gotchu, fam',
//             data: data
//         })
//     }).catch(err => res.status(500).json('Woah woah woah wait, who are we talking about?', err))
// })

router.post('/getuser/:id', (req, res) => {
    User.findOne({ where: { id: req.params.id } }) // later will need ", include: ['user', 'forum', 'thread']" once assoc is good
        .then(info => res.status(200).json({info, message: "It worked!!"}))
        .catch(err => res.status(500).json(err))
})

// exports.getUsers = async (req, res, next) => {
//     const users = await User.find({});
//     res.status(200).json({
//         data: users
//     });
// }

// exports.getUser = async (req, res, next) => {
//     try {
//         const userId = req.params.userId;
//         const user = await User.findById(userId);
//         if (!user) return next(new Error(`Yeah sorry, I don't know you.`));
//             res.status(200).json({
//                 data: user
//             });
//     } catch (error) {
//         next(error)
//     }
// }

// exports.updateUser = async (req, res, next) => {
//     try {
//         const update = req.body
//         const userId = req.params.userId;
//         await User.findByIdAndUpdate(userId, update);
//         const user = await User.findById(userId)
//         res.status(200).json({
//             data: user,
//             message: 'User has been updated'
//         });
//     } catch (error) {
//         next(error)
//     }
// }

// exports.deleteUser = async (req, res, next) => {
//     try {
//         const userId = req.params.userId;
//         await User.findByIdAndDelete(userId);
//         res.status(200).json({
//             data: null,
//             message: 'User has been deleted'
//         });
//     } catch (error) {
//         next(error)
//     }
// }

// exports.grandAccess = function(action, resource) {
//     return async (req, res, next) => {
//         try {
//             const permission = roles.can(req.user.role)[action](resource);
//             if (!permission.granted) {
//                 return res.status(401).json({
//                     error: "Yeah dude, I can't let you do that. It's a little above your pay-grade."
//                 });
//             }
//             next()
//         } catch (error) {
//             next(error)
//         }
//     }
// }

// exports.allowIfLoggedin = async (req, res, next) => {
//     try {
//         const user = res.locals.loggedInUser;
//         if (!user)
//         return res.status(401).json({
//             error: "You need to be logged in to access this route"
//         });
//         req.user = user;
//         next();
//     } catch (error) {
//         next(error);
//     }
// }

module.exports = router;