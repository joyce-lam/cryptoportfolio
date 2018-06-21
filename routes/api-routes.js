var path = require("path");
var express = require("express");

const router = express.Router();

router.get("/asdf", function(req, res) {
	res.send("hello world");
});

module.exports = router;

// module.exports = function(app) {


    // app.get('*', function(req, res) {
    //     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    // });

    // app.get('*', function(req, res) {
    //     res.sendFile(path.join(__dirname, 'public', 'index.html'));
    // });


    // Error: ENOENT: no such file or directory, stat '/Users/JLam/Desktop/cryptoportfolio/routes/public/index.html'


// };