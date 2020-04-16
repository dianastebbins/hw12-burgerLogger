// use Express package to create and run a backend server
const express = require("express");

// listen on port 8080 but enable optional env setting used by Heroku
const PORT = process.env.PORT || 8080;

// create the server app instance
const app = express();

// serve static content for the app from the "public" directory in the application directory
app.use(express.static("public"));

// parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// use Handlebars package to render pages
const exphbs = require("express-handlebars");

// setup Handlebars, "main.handlebars" is the file it will look for
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// import routes and give the server access to them
const routes = require("./controllers/burgers_controller.js");
app.use(routes);

// start server so that it can listen for client requests
app.listen(PORT, function() {
  // log (server-side) when server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
