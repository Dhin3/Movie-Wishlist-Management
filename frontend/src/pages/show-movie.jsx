import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Spinner from '../components/spinner'; // Assuming spinner component is imported correctly
import './styles.css'; // Import CSS file

const ShowMovie = () => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5556/movies/${id}`)
      .then((response) => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching movie:', error);
        setLoading(false);
      });
  }, [id]); // Dependency on id ensures useEffect runs when id changes

  return (
    <div className='p-4'>
      <Link to="/" className="back-link">
        <span className="back-icon">←</span> Back
      </Link>
      <h1 className='text-3xl my-4'>Movie Details</h1>
      {
        loading ? <Spinner /> :
        (
          <div className='flex flex-col border-2 border-sky-600 rounded-xl w-full p-4'>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Movie Name:</span>
              <span>{movie.name}</span>
            </div>

            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Genre:</span>
              <span>{movie.genere}</span>
            </div>

            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Director:</span>
              <span>{movie.director}</span>
            </div>

            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Star:</span>
              <span>{movie.star}</span>
            </div>

            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Duration:</span>
              <span>{movie.duration}</span>
            </div>

            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>First Created On:</span>
              <span>{movie.createdAt ? new Date(movie.createdAt).toString() : 'Not available'}</span>
            </div>

            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Last Updated On:</span>
              <span>{movie.updatedAt ? new Date(movie.updatedAt).toString() : 'Not available'}</span>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default ShowMovie;
