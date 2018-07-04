const jwt = require("jsonwebtoken");
const db = require("../models");
const Op = db.Sequelize.Op;
const User = require("../models/users");
const Passport = require("passport");
const PassportLocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");


module.exports = new PassportLocalStrategy({
    usernameField: "email",
    passwordField: "password",
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => {
    const userData = {
        email: email.trim(),
        password: password.trim(),
        name: req.body.name.trim()
    };

    userData.password = generateHash(userData.password);

    db.User.create({
        name: userData.name,
        email: userData.email,
        password: userData.password
    }).then(function(dbUser) {
        if (!dbUser) {
            const error = new Error("Unable to create new user");
            error.name = "Error";
            return done(null, false);
        } else {
            return done(null, dbUser);
        }
    }).catch(err => {
        console.log(err);
    })
});


generateHash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}