var express = require("express"),
	bodyParser = require("body-parser"),
	bcrypt = require("bcrypt"),
	session = require("express-session"),
	path = require("path"),
	db = require("./models");

var views = path.join(__dirname, "views");

app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
	secret: "Very secret",
	resave: false,
	saveUnitialized: true
}));

app.get("/", function (req, res){
	var homePath = path.join(views, "home.html");
	res.sendFile(homePath);
});

app.get("/login", function (req, res){
	var loginPath = path.join(views, "login.html");
	res.sendFile(loginPath);
});

app.get("/signup", function (req, res){
	var signupPath = path.join(views, "signup.html");
	res.sendFile(signupPath);
});

app.get("/profile", function (req, res){
	var profilePath = path.join(views, "profile.html")
	res.sendFile(profilePath);
});

app.listen(3000, function(){
	console.log("Running! GO CHECK LOCALHOST:3000");
});

// idea: hard code genre list to select from
// todo: come up with a second schema idea
//todo: scrape wiki music genre list
