const db = require("../db/dbConfig.js");

// GET ALL MOVIES
const getAllMovies = async () => {
  try {
    const movies = await db.many("SELECT * FROM movies;");
    return movies;
  } catch (error) {
    console.error("Error in getAllMovies:", error);
    throw error; 
  }
};

// GET A SINGLE MOVIE
const getMovie = async (id) => {
  try {
    const movie = await db.oneOrNone('SELECT * FROM movies WHERE id = $1', [id]);
    return movie;
  } catch (error) {
    console.error("Error in getMovie:", error);
    throw error; 
  }
};

// GET MOVIE BY ID
const getMovieByID = async (id) => {
  const queryStr = "SELECT * FROM movies WHERE id=$1";
  try {
    const movie = await db.one(queryStr, [id]);
    return movie;
  } catch (error) {
    console.error("Error in getMovieByID:", error);
    throw error; 
  }
};
 
const getMovieByUserId = async (user_id) => {
    const queryStr = "SELECT * FROM movies WHERE user_id=$1"; 
    try {
        const movie = await db.any(queryStr, [user_id]);
        return movie;
      } catch (error) {
        console.error("Error in getMovieByUserId:", error);
        throw error; 
      }
}

// DELETE A MOVIE
const deleteMovie = async (id) => {
  const queryStr = "DELETE FROM movies WHERE id=$1 RETURNING *;";
  try {
    const movie = await db.one(queryStr, [id]);
    return movie;
  } catch (error) {
    console.error("Error in deleteMovie:", error);
    throw error; 
  }
};

// CREATE A MOVIE
const createMovie = async (movie, user_id) => {
    const queryStr = 
      "INSERT INTO movies (title, release_date, genre, description, poster_url, rating, duration, user_id, is_favorite) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *";
    try {
      const newMovie = await db.one(queryStr, [
        movie.title,
        movie.release_date,
        movie.genre,
        movie.description,
        movie.poster_url,
        movie.rating,
        movie.duration,
        user_id,  
        movie.is_favorite
      ]);
      return newMovie;
    } catch (error) {
      console.error("Error in createMovie:", error);
      throw error; 
    }
  };

// UPDATE A MOVIE
const updateMovie = async (id, movie) => {
  const keys = Object.keys(movie).filter((key) => movie[key] !== undefined);
  const queryStr =
    "UPDATE movies SET " +
    `${keys.map((key, index) => `${key}=$${index + 1}`).join(", ")} ` +
    "WHERE id=$" + (keys.length + 1) + " RETURNING *;";
  try {
    const updatedMovie = await db.one(queryStr, [...Object.values(movie), id]);
    return updatedMovie;
  } catch (error) {
    console.error("Error in updateMovie:", error);
    throw error; 
  }
};

// SEARCH MOVIE BY TITLE
const searchMovieByTitle = async (titleArray) => {
    try {
      let query = "SELECT * FROM movies WHERE LOWER(title) LIKE ";
      const queryParams = [];
  
      titleArray.forEach((word, index) => {
        if (index > 0) query += " AND LOWER(title) LIKE ";
        query += `$${index + 1}`;
        queryParams.push(`%${word}%`);
      });
  
      const movies = await db.any(query, queryParams);
      return movies;
    } catch (err) {
      console.error("Error searching movies by title:", err);
      return [];
    }
  };

module.exports = {
  getAllMovies,
  getMovieByID,
  getMovieByUserId,
  deleteMovie,
  getMovie,
  createMovie,
  updateMovie,
  searchMovieByTitle,
};
