DROP DATABASE IF EXISTS movies_dev;
CREATE DATABASE movies_dev;

\c movies_dev;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  profile_picture TEXT 
);

CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  release_date DATE,
  genre TEXT,
  description TEXT,
  poster_url VARCHAR(255),
  rating INTEGER CHECK (rating >= 0 AND rating <= 10),
  is_favorite BOOLEAN,
  duration INTEGER,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 0 AND rating <= 10) NOT NULL,
  comment TEXT
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
  priority VARCHAR(255)
);
