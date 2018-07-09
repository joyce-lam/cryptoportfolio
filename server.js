const express = require("express");
require("dotenv").config();

const app = express();

//define PORT
const PORT = process.env.PORT || 8000;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("./react-ui/build"));


const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//parse application/text
app.use(bodyParser.text());
// parse application/json
app.use(bodyParser.json());


// enable CORS so that browsers don"t block requests.
app.use((req, res, next) => {
  	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  	res.header("Access-Control-Allow-Credentials", "true");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Accept");
  	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE"); 
  	next();
});


//passport auth middleware setup
const passport = require("passport");
const localSignupStrategy = require("./passport/local-signup");
const localLoginStrategy = require("./passport/local-login");
passport.use("local-signup", localSignupStrategy);
passport.use("local-login", localLoginStrategy);
app.use(passport.initialize());


//JWT auth middleware setup
const authCheckMiddleware = require("./middleware/auth-check");
app.use("/api/users", authCheckMiddleware);
app.use("/api/coin", authCheckMiddleware);
app.use("/api/coins/all", authCheckMiddleware);


//routes setup
const routes = require("./routes");
app.use(routes)


//redis client
const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL || 6379);


//db + Sequelize
// Syncing our sequelize models and then starting our Express app
const db = require("./models");
db.sequelize.sync().then(function(err) {
  	app.listen(PORT, function() {
    	console.log("App listening on PORT " + PORT);
  	});
});