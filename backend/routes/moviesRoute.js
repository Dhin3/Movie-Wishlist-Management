import { MOVIE_MODEL } from "../Model/movie-model.js";
import express from "express";
import cors from "cors";

const router = express.Router();

// Middleware to enable CORS for specified origin
router.use(cors({
  origin: 'http://localhost:5173'
}));

function isAllFields(fields) {
  return (
    fields.name &&
    fields.genere &&
    fields.director &&
    fields.duration &&
    fields.star
  );
}

function getMovieFromReq(reqBody) {
  return {
    name: reqBody.name,
    genere: reqBody.genere,
    director: reqBody.director,
    duration: reqBody.duration,
    star: reqBody.star
  };
}



// Create a new movie
router.post('/', async (req, res) => {
  try {
    if (isAllFields(req.body)) {
      const newMovie = getMovieFromReq(req.body);
      const createdMovie = await MOVIE_MODEL.create(newMovie);
      return res.status(201).json(createdMovie); // 201 Created
    } else {
      return res.status(400).json({ message: "Missing fields" }); // 400 Bad Request
    }
  } catch (error) {
    console.error('Error creating movie:', error);
    return res.status(500).json({ error: error.message }); // 500 Internal Server Error
  }
});

// Get all movies
router.get('/', async (req, res) => {
  try {
    const allMovies = await MOVIE_MODEL.find({});
    return res.status(200).json({
      count: allMovies.length,
      movies: allMovies
    });
  } catch (error) {
    console.error('Error fetching all movies:', error);
    return res.status(500).json({ error: error.message });
  }
});

// Get movie by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await MOVIE_MODEL.findById(id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' }); // 404 Not Found
    }
    return res.status(200).json(movie);
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    return res.status(500).json({ error: error.message });
  }
});

// Get movies by genre
router.get('/genre/:genere', async (req, res) => {
  const { genere } = req.params;
  try {
    const movies = await MOVIE_MODEL.find({ genere: { $regex: genere, $options: 'i' } });
    if (!movies || movies.length === 0) {
      return res.status(404).json({ message: 'No movies found for this genre' });
    }
    return res.status(200).json(movies);
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Update movie by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (isAllFields(req.body)) {
      const updatedMovie = getMovieFromReq(req.body);
      const result = await MOVIE_MODEL.findByIdAndUpdate(id, updatedMovie);
      if (!result) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      return res.status(200).json({ message: 'Movie updated successfully' });
    } else {
      return res.status(400).json({ message: 'All fields are required' });
    }
  } catch (error) {
    console.error('Error updating movie:', error);
    return res.status(500).json({ error: error.message });
  }
});

// Delete movie by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMovie = await MOVIE_MODEL.findByIdAndDelete(id);
    if (!deletedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    return res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (error) {
    console.error('Error deleting movie:', error);
    return res.status(500).json({ error: error.message });
  }
});

export default router;
