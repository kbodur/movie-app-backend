// Dependencies
const express = require("express");

const favorites = express.Router({ mergeParams: true });

const { getMovie } = require('../queries/movies')

// Queries
const {
    getAllFavorites,
  getFavorite,
  createFavorite,
  deleteFavorite,
  updateFavorite
} = require("../queries/favorites");

// INDEX
favorites.get("/", async (req, res) => {
    const { movie_id } = req.params;
    try {
      const favorites = await getAllFavorites(movie_id);
      const movie = await getMovie(movie_id);
  
      if (movie.id) {
        res.status(200).json({ ...movie, favorites });
      } else {
        res.status(404).json({ error: "Movie not found." });
      }
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
  
// SHOW

favorites.get("/:id", async (req, res) => {
  const { movie_id, id } = req.params;
  const favorite = await getFavorite(id);
  const movie = await getMovie(movie_id)

  if (favorite) {
    res.json({ ...movie, favorite });
  } else {
    res.status(404).json({ error: "not found" });
  }
});

// UPDATE

favorites.put("/:id", async (req, res) => {
    const { user_id, movie_id, id } = req.params;
  const updatedFavorite= await updateFavorite({ movie_id, id, ...req.body });
  if (updatedFavorite.id) {
    res.status(200).json(updatedFavorite);
  } else {
    res.status(404).json("Favorite not found");
  }
});



favorites.post("/", async (req, res) => {
  const { user_id, movie_id } = req.params
  const favorite = await createFavorite({ ...req.body, movie_id });
  res.status(200).json(favorite);
});

// DELETE
favorites.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedFavorite= await deleteFavorite(id);
  if (deletedFavorite.id) {
    res.status(200).json(deletedFavorite);
  } else {
    res.status(404).json({ error: "Favorite not found" });
  }
});

module.exports = favorites;
