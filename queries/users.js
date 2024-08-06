const db = require("../db/dbConfig.js");

// GET ALL USERS
const getAllUsers = async () => {
  try {
    const allUsers = await db.any("SELECT * FROM users");
    return allUsers;
  } catch (error) {
    console.error("Error getting all users:", error);
    throw new Error(error.message); 
  }
};

// GET A SINGLE USER

async function getUser(userId) {
    try {
      const user = await db.oneOrNone('SELECT * FROM users WHERE id = $1', [userId]);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      console.error("Error retrieving user:", error);
      throw new Error(error.message);
  
    }
}
// CREATE A USER
const createUser = async (user) => {
  try {
    const createdUser = await db.one(
      "INSERT INTO users (username, email, password, profile_picture) VALUES($1, $2, $3, $4) RETURNING *",
      [
        user.username,
        user.email,
        user.password,
        user.profile_picture
      ]
    );
    return createdUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error(error.message); 
  }
};

// DELETE A USER
const deleteUser = async (id) => {
  try {
    const deletedUser = await db.one(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    return deletedUser;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error(error.message); 
  }
};

// UPDATE A USER
const updateUser = async (user) => {
  try {
    const updatedUser = await db.one(
      "UPDATE users SET username=$1, email=$2, password=$3, profile_picture=$4 WHERE id=$5 RETURNING *",
      [
        user.username,
        user.email,
        user.password,
        user.profile_picture,
        user.id 
      ]
    );
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error(error.message);
  }
};

// GET ALL USERS ORDERED
const getAllUsersOrdered = async () => {
  try {
    const allUsers = await db.any("SELECT * FROM users ORDER BY username ASC"); 
    return allUsers;
  } catch (error) {
    console.error("Error getting all users ordered:", error);
    throw new Error(error.message); 
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  getAllUsersOrdered
};
