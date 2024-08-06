const express = require("express");
const movies = express.Router({ mergeParams: true });
const {  checkTitle, checkDescription } = require('../validations/checkMovies')
const {
  getAllMovies,
  getMovieByID,
  getMovieByUserId,
  deleteMovie,
  createMovie,
  updateMovie,
  searchMovieByTitle,
} = require("../queries/movies");

// Nested Controllers
const reviewsController = require('./reviewsController');
movies.use("/:movie_id/reviews", reviewsController);

const favoritesController = require('./favoritesController');
movies.use("/:movie_id/favorites", favoritesController);

// INDEX
movies.get("/", async (req, res) => {
  try {
    let allMovies = [];

    if (req.query.title) {
      const title = req.query.title.toLowerCase().split(" ");
      allMovies = await searchMovieByTitle(title);
    } else if (req.params.user_id) {
      allMovies = await getMovieByUserId(req.params.user_id);
    } else {
      allMovies = await getAllMovies();
    }

    res.status(200).json(allMovies);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
});

// SHOW
movies.get("/:id", async (req, res) => {
  try {
    const movie = await getMovieByID(req.params.id);
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ error: "Movie not Found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
});

// DELETE
movies.delete("/:id", async (req, res) => {
  try {
    const movie = await deleteMovie(req.params.id);
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ error: "Movie not Found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
});

// CREATE
// Server-side code
movies.post("/",checkTitle, checkDescription, async (req, res) => {
    try {
      const movie = await createMovie(req.body, req.params.user_id); 
      console.log(movie)
      if (movie) {
        
        res.status(201).json(movie); 
      } else {
        res.status(400).json({ error: "Unable to create movie." });
      }
    } catch (error) {
      console.error("Error creating movie:", error); 
      res.status(500).json({ error: "Internal Server Error." });
    }
  });
  

// UPDATE
movies.put("/:id",checkTitle, checkDescription, async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await updateMovie(id, req.body);
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ error: "Movie not Found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
});

module.exports = movies;
