const db = require("../db/dbConfig.js");

// GET ALL FAVORITES
const getAllFavorites = async (movie_id) => {
  try {
    const allFavorites = await db.any("SELECT * FROM favorites WHERE movie_id=$1", [movie_id]);
    return allFavorites;
  } catch (error) {
    console.error("Error in getAllFavorites:", error);
    throw error; // Hata fırlatma
  }
};

// GET A SINGLE FAVORITE
const getFavorite = async (id) => {
  try {
    const oneFavorite = await db.one("SELECT * FROM favorites WHERE id=$1", [id]);
    return oneFavorite;
  } catch (error) {
    console.error("Error in getFavorite:", error);
    throw error; // Hata fırlatma
  }
};

// CREATE A NEW FAVORITE
const createFavorite = async (favorite) => {
  try {
    const newFavorite = await db.one(
      "INSERT INTO favorites (user_id, movie_id, priority) VALUES($1, $2, $3) RETURNING *",
      [favorite.user_id, favorite.movie_id, favorite.priority]
    );
    return newFavorite;
  } catch (error) {
    console.error("Error in createFavorite:", error);
    throw error; // Hata fırlatma
  }
};

// DELETE A FAVORITE
const deleteFavorite = async (id) => {
  try {
    const deletedFavorite = await db.one(
      "DELETE FROM favorites WHERE id = $1 RETURNING *",
      [id]
    );
    return deletedFavorite;
  } catch (error) {
    console.error("Error in deleteFavorite:", error);
    throw error; // Hata fırlatma
  }
};

// UPDATE A FAVORITE
const updateFavorite = async (favorite) => {
  try {
    const updatedFavorite = await db.one(
      "UPDATE favorites SET user_id=$1, movie_id=$2, priority=$3 WHERE id=$4 RETURNING *",
      [favorite.user_id, favorite.movie_id, favorite.priority, favorite.id]
    );
    return updatedFavorite;
  } catch (error) {
    console.error("Error in updateFavorite:", error);
    throw error; 
  }
};

module.exports = {
  getAllFavorites,
  getFavorite,
  createFavorite,
  deleteFavorite,
  updateFavorite
};
