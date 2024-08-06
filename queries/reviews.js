const db = require("../db/dbConfig.js");

// GET ALL REVIEWS
const getAllReviews = async (user_id, movie_id) => {
  try {
    const allReviews = await db.any("SELECT * FROM reviews WHERE user_id=$1 AND movie_id=$2", [user_id, movie_id]);
    return allReviews;
  } catch (error) {
    console.error("Error getting all reviews:", error);
    throw new Error(error.message); // Hata fırlatma
  }
};

// GET A SINGLE REVIEW
const getReview = async (id) => {
  try {
    const oneReview = await db.oneOrNone("SELECT * FROM reviews WHERE id=$1", [id]);
    return oneReview;
  } catch (error) {
    console.error("Error getting review:", error);
    throw new Error(error.message); // Hata fırlatma
  }
};

// CREATE A REVIEW
const createReview = async (review) => {
  try {
    const newReview = await db.one(
      "INSERT INTO reviews (user_id, movie_id, rating, comment) VALUES($1, $2, $3, $4) RETURNING *",
      [
        review.user_id,
        review.movie_id, 
        review.rating,
        review.comment,
      ]
    );
    return newReview;
  } catch (error) {
    console.error("Error creating review:", error);
    throw new Error(error.message); // Hata fırlatma
  }
};

// DELETE A REVIEW
const deleteReview = async (id) => {
  try {
    const deletedReview = await db.one(
      "DELETE FROM reviews WHERE id = $1 RETURNING *",
      [id]
    );
    return deletedReview;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw new Error(error.message); // Hata fırlatma
  }
};

// UPDATE A REVIEW
const updateReview = async (review) => {
  try {
    const updatedReview = await db.one(
      "UPDATE reviews SET user_id=$1, movie_id=$2, rating=$3, comment=$4 WHERE id=$5 RETURNING *",
      [
        review.user_id,
        review.movie_id, 
        review.rating,
        review.comment,
        review.id 
      ]
    );
    return updatedReview;
  } catch (error) {
    console.error("Error updating review:", error);
    throw new Error(error.message);
  }
};

module.exports = {
  getAllReviews,
  getReview,
  createReview,
  deleteReview,
  updateReview,
};
