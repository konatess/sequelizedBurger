// DEPENDENCIES
var express = require("express")
var path = require("path")
var routes = require("./controllers/burgers_controller")

var PORT = process.env.PORT || 8080;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(path.join(__dirname, "/public")));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use routes from burger_controller as defined in above Dependencies
app.use(routes);

app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});