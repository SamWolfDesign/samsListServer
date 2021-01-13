const jwt = require('jsonwebtoken');
const db = require('../db');
const User = require('../models/user');

const validateSession = (req, res, next) => {
    const token = req.headers.authorization;
    console.log('token ==> ', token);
    if(!token) {
        return res.status(403).send({ auth: false, message: "No tokey 4 u :("})
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
            console.log('decodeToken --> ', decodeToken);
            if(!err && decodeToken) {
                User.findOne({
                    where: {
                        id: decodeToken.id
                    }
                })
                .then(user => {
                    console.log('user --> ', user);
                    if(!user) throw "err";
                    console.log('req --> ', req);
                    req.user = user;
                    return next();
                })
                .catch(err => next(err));
            } else {
                req.errors = err;
                return res.status(500).json({
                    err: err
                });
            }
        });
    }
};

module.exports = validateSession;