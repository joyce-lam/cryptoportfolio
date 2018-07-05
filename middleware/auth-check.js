const jwt = require("jsonwebtoken");
const db = require("../models");
const Op = db.Sequelize.Op;
const User = require("../models/users");
const jwtSecret = require("../config/keys.js");


module.exports = (req, res, next) => {

    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
        console.log("1", token)
        
    } else if (req.body.headers.Authorization) {

        token = req.body.headers.Authorization.split(" ")[1]; 
        console.log("2", token)
    } else {
        return res.status(401).end();
    }


    return jwt.verify(token, jwtSecret.jwt.secret, (err, decoded) => {
        if (err) { 
            return res.status(401).end(); 
        }

        const userId = decoded.sub;

        return db.User.findOne({
                where: {
                    id: userId
                }
            }).then(user => {
                req.user = userId;
                return next();
            }).catch(err => {
                console.log(err);
            })
    });
};
