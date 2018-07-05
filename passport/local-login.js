const jwt = require('jsonwebtoken');
const db = require("../models");
const Op = db.Sequelize.Op;
const User = require("../models/users");
const Passport = require("passport")
const PassportLocalStrategy = require("passport-local").Strategy;
const config = require("../config/config.json");
const jwtSecret = require("../config/keys.js");
const bcrypt = require("bcryptjs");


module.exports = new PassportLocalStrategy({
    usernameField: "email",
    passwordField: "password",
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => {
    const userData = {
        email: email.trim(),
        password: password.trim()
    };

    db.User.findOne({
        where: {
            email: email
        }
    }).then(function(user) {
        if (!user) {
            const error = new Error("User not registered");
            error.name = "IncorrectCredentialsError";
            return done(error);
        }

        if (!comparePassword(userData.password, user.dataValues.password)) {
            console.log("test", userData.password, user.dataValues.password);
            const error = new Error("Incorrect email or password");
            error.name = "IncorrectCredentialsError";
            return done(error);
        }

        const payload = {
            sub: user.dataValues.id,
            name: user.dataValues.name
        };
        console.log(jwtSecret)
        const token = jwt.sign(payload, jwtSecret.jwt.secret);
        const data = {
            name: user.name
        };

        return done(null, token, data);

    }).catch(function(err) {
        console.log(err);
        return done(err);
    });
});


generateHash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}