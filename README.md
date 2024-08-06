# Movie App Backend

Welcome to the Movie App! This is a full-stack application for managing a list of movies. The backend is built with Express and PostgreSQL, while the frontend is designed with React.

- My Live Server[];
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Validations](#validations)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/kbodur/movie-app-backend.git
   cd movie-app-backend
## Install server dependencies:

npm install
## Set up environment variables:
Create a .env file in the root directory and add the following variables:
PORT=4003
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=movies_dev
PG_USER=postgres   

## Set up the database:
\c movies_dev

INSERT INTO users (username, email, password, profile_picture)
VALUES 
  ('kubraa', 'kbodur@pursuit.org', 'password1', 'https://i0.wp.com/pixarpost.com/wp-content/uploads/2016/02/InsideOut-Disgust-Poster.jpg?resize=1200%2C1965&ssl=1'),
  ('fizikcim', 'fizikcim@example.com', 'password2', 'https://i.pinimg.com/736x/0a/1b/8c/0a1b8c951d724b9069b265baf5d055b9.jpg');

INSERT INTO movies (title, release_date, genre, description, poster_url, rating, duration, user_id, is_favorite)
VALUES 
  ('Inception', '2010-07-16', 'Sci-Fi', 'A thief who steals corporate secrets through the use of dream-sharing technology...', 'https://m.media-amazon.com/images/I/91pXXQipyYL._AC_UY218_.jpg', 9, 148, 1,true),
  ('The Matrix', '1999-03-31', 'Sci-Fi', 'A computer hacker learns from mysterious rebels about the true nature...', 'https://m.media-amazon.com/images/I/81CTOywuRaL._AC_UY218_.jpg', 9, 136, 2, false),
  ('Interstellar', '2014-11-07', 'Sci-Fi', 'A team of explorers travel through a wormhole in space...', 'https://m.media-amazon.com/images/I/91QqHuKHfTL._AC_UY218_.jpg', 9, 169, 1,true),
  ('The Dark Knight', '2008-07-18', 'Action', 'When the menace known as the Joker emerges...', 'https://m.media-amazon.com/images/I/910lwRBoPLL._AC_UY218_.jpg', 9, 152, 1, false),
  ('Gladiator', '2000-05-05', 'Action', 'A former Roman General sets out to exact vengeance...', 'https://m.media-amazon.com/images/I/81UNclZEbtL._AC_UY218_.jpg', 8, 155, 1, true),
  ('Mad Max: Fury Road', '2015-05-15', 'Action', 'In a post-apocalyptic wasteland, a woman rebels...', 'https://m.media-amazon.com/images/I/81MWO3dL9dL._AC_UY218_.jpg', 8, 120, 2, false),
  ('The Godfather', '1972-03-24', 'Crime', 'The aging patriarch of an organized crime dynasty transfers control...', 'https://m.media-amazon.com/images/I/714ZOEiVNtL._AC_UY218_.jpg', 10, 175, 2, true),
  ('Pulp Fiction', '1994-10-14', 'Crime', 'The lives of two mob hitmen, a boxer, a gangster, and his wife...', 'https://m.media-amazon.com/images/I/81jSxySrrQL._AC_UY218_.jpg', 9, 154, 2, true),
  ('The Departed', '2006-10-06', 'Crime', 'An undercover cop and a mole in the police attempt to identify each other...', 'https://m.media-amazon.com/images/I/81DSjesg9TL._AC_UY218_.jpg', 8, 151, 1, true),
  ('Forrest Gump', '1994-07-06', 'Drama', 'The presidencies of Kennedy and Johnson, the events of Vietnam...', 'https://m.media-amazon.com/images/I/71JX0CinxIL._AC_UY218_.jpg', 8, 142, 1, true),
  ('The Shawshank Redemption', '1994-09-23', 'Drama', 'Two imprisoned men bond over a number of years...', 'https://m.media-amazon.com/images/I/81y0Ot+xx6L._AC_UY218_.jpg', 10, 142, 2, false),
  ('Fight Club', '1999-10-15', 'Drama', 'An insomniac office worker and a devil-may-care soap maker form an underground fight club...', 'https://m.media-amazon.com/images/I/31CauYmKHlL._AC_UY218_.jpg', 8, 139, 2, false),
  ('Toy Story', '1995-11-22', 'Animation', 'A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy...', 'https://m.media-amazon.com/images/I/51kRYr5Mm5L._AC_UY218_.jpg', 8, 81, 2, false),
  ('Finding Nemo', '2003-05-30', 'Animation', 'After his son is captured in the Great Barrier Reef and taken to Sydney, a timid clownfish sets out on a journey...', 'https://m.media-amazon.com/images/I/912Yml7+hJL._AC_UY218_.jpg', 8, 100, 1, true);

 

INSERT INTO reviews (user_id, movie_id, rating, comment)
VALUES 
  (1, 1, 9, 'Amazing movie with a complex plot!'),
  (2, 2, 10, 'Best superhero movie ever!'),
  (1, 3, 10, 'A masterpiece!'),
  (2, 4, 9, 'Iconic dialogues and storytelling!'),
  (1, 5, 10, 'A beautiful story of hope and friendship.'),
  (2, 6, 9, 'A revolutionary sci-fi film.'),
  (1, 7, 8, 'Inspiring and heartwarming.'),
  (2, 8, 8, 'A gripping and thought-provoking drama.'),
  (1, 9, 9, 'Visually stunning and emotionally moving.');
 

INSERT INTO favorites (user_id, movie_id, priority)
VALUES 
  (1, 1, 'High'),
  (2, 2, 'High'),
  (1, 3, 'Medium'),
  (2, 4, 'High'),
  (1, 5, 'High'),
  (2, 6, 'Medium'),
  (1, 7, 'Low'),
  (2, 8, 'Medium'),
  (1, 9, 'High'),
  (2, 10, 'Medium');

  ## Run the server:
 npm start
 

## Usage
Once the server is running, you can access the API at http://localhost:4003. You can use tools like Postman to test the API endpoints.

## API Endpoints
 - Users
GET /users - Get all users.
GET /users/:id - Get a user by ID.
POST /users - Create a new user.
PUT /users/:id - Update a user.
DELETE /users/:id - Delete a user.
POST /users/login - Log in a user.
 - Movies
GET /users/:user_id/movies - Get all movies or filter by title.
GET /users/:user_id/movies/:id - Get a movie by ID.
POST /users/:user_id/movies - Create a new movie.
PUT /users/:user_id/movies/:id - Update a movie.
DELETE /users/:user_id/movies/:id - Delete a movie.
 - Reviews
GET /users/:user_id/movies/:movie_id/reviews - Get all reviews for a movie.
GET /users/:user_id/movies/:movie_id/reviews/:id - Get a review by ID.
POST /users/:user_id/movies/:movie_id/reviews - Create a new review.
PUT /users/:user_id/movies/:movie_id/reviews/:id - Update a review.
DELETE /users/:user_id/movies/:movie_id/reviews/:id - Delete a review.
 - Favorites
GET /users/:user_id/movies/:movie_id/favorites - Get all favorite movies.
GET /users/:user_id/movies/:movie_id/favorites/:id - Get a favorite movie by ID.
POST /users/:user_id/movies/:movie_id/favorites - Mark a movie as favorite.
PUT /users/:user_id/movies/:movie_id/favorites/:id - Update favorite movie details.
DELETE /users/:user_id/movies/:movie_id/favorites/:id - Remove a movie from favorites.


## Database Schema
The database schema includes the following tables:

  1. users: Contains user information.

  id: Primary key.
  username: User's username.
  email: User's email.
  password: User's password.
  profile_picture: URL of the user's profile picture.

  2. movies: Contains movie information.

   id: Primary key.
   title: Movie title.
   release_date: Release date of the movie.
   genre: Genre of the movie.
   description: Description of the movie.
   poster_url: URL of the movie poster.
   rating: Movie rating.
   is_favorite: Boolean indicating if the movie is marked as a favorite.
   duration: Duration of the movie in minutes.
   user_id: Foreign key referencing the user who added the movie.

  3.reviews: Contains reviews written by users.

   id: Primary key.
   user_id: Foreign key referencing the user who wrote the review.
   movie_id: Foreign key referencing the movie being reviewed.
   rating: Rating given to the movie.
   comment: Comment about the movie.
   favorites: Contains information about favorite movies.

  4. id: Primary key.
   user_id: Foreign key referencing the user who marked the movie as favorite.
   movie_id: Foreign key referencing the favorite movie.
   priority: Priority of the favorite movie.



  ## Contributing
If you would like to contribute to this project, please fork the repository and create a pull request with your changes. Make sure to follow best practices and write clear commit messages.

  ## License
This project is licensed under the MIT License. See the LICENSE file for details.

