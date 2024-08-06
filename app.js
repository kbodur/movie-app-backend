// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");


// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));


// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to the Movies App");
});

// Import and use controllers
const usersController = require("./controllers/usersController");
app.use("/users", usersController);

const moviesController = require("./controllers/moviesController");
app.use("/movies", moviesController);


  
  

// const moviesController = require("./controllers/moviesController");
// app.use("/movies", moviesController);

// Catch-all route for 404
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

// EXPORT
module.exports = app;
