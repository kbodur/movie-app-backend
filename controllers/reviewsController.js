const express = require("express");
const reviews = express.Router({ mergeParams: true });

const { getUser } = require('../queries/users');


const {
    getAllReviews,
    getReview,
    createReview,
    deleteReview,
    updateReview,
} = require("../queries/reviews");

// INDEX
reviews.get("/", async (req, res) => {
    const { user_id, movie_id } = req.params;
    try {
        const user = await getUser(user_id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        const reviews = await getAllReviews(user_id, movie_id);
        res.status(200).json({ user, reviews });
    } catch (error) {
        console.error("Error getting all reviews:", error);
        res.status(500).json({ error: error.message });
    }
});


// SHOW
reviews.get("/:id", async (req, res) => {
    const { user_id, id } = req.params;
    try {
        const review = await getReview(id);
        const user = await getUser(user_id);

        if (review && user) {
            res.json({ user, review });
        } else {
            res.status(404).json({ error: "Review or User not found" });
        }
    } catch (error) {
        console.error("Error getting review:", error);
        res.status(500).json({ error: error.message });
    }
});

// UPDATE
reviews.put("/:id", async (req, res) => {
    const { user_id, id } = req.params;
    try {
        const updatedReview = await updateReview({ user_id, id, ...req.body });
        if (updatedReview) {
            res.status(200).json(updatedReview);
        } else {
            res.status(404).json({ error: "Review not found" });
        }
    } catch (error) {
        console.error("Error updating review:", error);
        res.status(500).json({ error: error.message });
    }
});

// CREATE
reviews.post("/", async (req, res) => {
    const { user_id } = req.params;
    try {
        const review = await createReview({ ...req.body, user_id });
        res.status(201).json(review);
    } catch (error) {
        console.error("Error creating review:", error);
        res.status(500).json({ error: error.message });
    }
});

// DELETE
reviews.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedReview = await deleteReview(id);
        if (deletedReview) {
            res.status(200).json(deletedReview);
        } else {
            res.status(404).json({ error: "Review not found" });
        }
    } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = reviews;
