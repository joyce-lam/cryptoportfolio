var path = require("path");
var express = require("express");

module.exports = function(app) {


    // app.use(express.static(path.join(__dirname, "../public")));




    app.get("/", function(req, res) {
        // res.sendFile(path.join(__dirname, "../public/index.html"));
        res.render(index)
    });

    // app.get("*", function(req, res) {
    //     res.sendFile(path.join(__dirname, "../public/index.html"));
    // });

    app.get("/home", function(req, res) {
        // res.sendFile(path.join(__dirname, "../../home"));
        res.render(index)
    });
};