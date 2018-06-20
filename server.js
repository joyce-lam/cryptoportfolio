var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
// var passport = require("passport");
// var passportSetup = require("./config/passport-setup");
require("dotenv").config();

var PORT = process.env.PORT || 5000;

var app = express();

var db = require("./models");

// Serve static content for the app from the "public" directory in the application directory.
// app.use(express.static("./client/build"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//parse application/text
app.use(bodyParser.text());
// parse application/json
app.use(bodyParser.json());


// enable CORS so that browsers don't block requests.
app.use((req, res, next) => {
  //access-control-allow-origin http://localhost:3000
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); 
  next();
});




app.use(cookieParser());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
	cookie: {
		expires: 60 *1000,
		httpOnly: false
	}
}));

// Initialize Passport and restore authentication state, if any, from the
// session.
// app.use(passport.initialize());
// app.use(passport.session());


// Import routes and give the server access to them.
// var authRoutes = require("./routes/auth-routes");
// app.use("/auth", authRoutes);

// var apiRoutes = require("./routes/api-routes.js");
// app.use("/", apiRoutes);

// var htmlRoutes = require("./routes/html-routes.js");
// app.use("/", htmlRoutes);

require("./routes/api-routes.js")(app);

require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function(err) {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

