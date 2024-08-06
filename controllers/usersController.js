const express = require("express");
const users = express.Router();
const { getAllUsers, getUser, createUser, deleteUser, updateUser } = require('../queries/users');
const db = require("../db/dbConfig.js");
const moviesController = require('./moviesController');
users.use("/:user_id/movies", moviesController);



// INDEX
users.get("/", async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: "Server error while retrieving users." });
  }
});

// SHOW
users.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const singleUser = await getUser(id);
      
      if (singleUser) {
        res.status(200).json(singleUser);
      } else {
        res.status(404).json({ error: "User not found." });
      }
    } catch (error) {
      console.error("Error retrieving user:", error);
      res.status(500).json({ error: "Server error while retrieving user." });
    }
  });
  

// CREATE
users.post("/", async (req, res) => {
  try {
    const singleUser = await createUser(req.body);
    if (singleUser.id) {
      res.status(201).json(singleUser);
    } else {
      res.status(400).json({ error: "Unable to create user." });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error while creating user." });
  }
});

// DELETE
users.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUser(id);
    if (deletedUser) {
      res.status(200).json(deletedUser);
    } else {
      res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error while deleting user." });
  }
});

// UPDATE
users.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await updateUser(id, req.body);
    if (updatedUser.id) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error while updating user." });
  }
});

users.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await db.oneOrNone(
        "SELECT id, username, email, profile_picture FROM users WHERE username = $1 AND password = $2",
        [username, password]
      );
  
      if (user) {
        res.json({ message: "Login successful", user });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Server error during login." });
    }
  });
  

module.exports = users;
