import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/spinner';  // Ensure spinner is a default export from spinner file
import axios from 'axios';

const DeleteMovie = () => {
  const { id } = useParams();  // Get movie ID from URL parameters
  const [name, setName] = useState('');
  const [genere, setGenere] = useState('');
  const [director, setDirector] = useState('');
  const [star, setStar] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current movie details
    axios.get(`http://localhost:5556/movies/${id}`)
      .then((response) => {
        const { name, genere, director, star, duration } = response.data;
        setName(name);
        setGenere(genere);
        setDirector(director);
        setStar(star);
        setDuration(duration);
        setFetching(false);
      })
      .catch((error) => {
        console.log('Error fetching movie details:', error);
        setFetching(false);
        alert('Error fetching movie details');
      });
  }, [id]);

  const handleDelete = () => {
    setLoading(true);

    axios.delete(`http://localhost:5556/movies/${id}`)
      .then((response) => {
        console.log('Delete successful:', response.data);
        setLoading(false);
        navigate('/');  // Navigate to home after successful delete
      })
      .catch((error) => {
        console.log('Error occurred:', error);
        setLoading(false);
        alert('Error occurred');
      });
  };

  if (fetching) {
    return <Spinner />;
  }

  return (
    <div className='bg-red-100 p-4'>
<Link to="/" className="back-link mb-4 block w-[100px] text-white">
          <span className="back-icon">←</span> Back
        </Link>
    <div className="flex flex-col justify-center items-center min-h-screen ">

      <div className="border-2 border-red-600 rounded-xl p-6 w-full max-w-[600px] bg-white shadow-md">
        
        <h1 className='text-3xl my-4 text-center text-red-600'>Delete Movie</h1>
        {loading ? <Spinner /> : ''}
        <p className='text-xl my-4 text-center'>Are you sure you want to delete the following movie?</p>
        <div className='my-4'>
          <p className='text-xl mr-4 text-gray-500'>Name: <span className='text-red-600'>{name}</span></p>
          <p className='text-xl mr-4 text-gray-500'>Genere: <span className='text-red-600'>{genere}</span></p>
          <p className='text-xl mr-4 text-gray-500'>Director: <span className='text-red-600'>{director}</span></p>
          <p className='text-xl mr-4 text-gray-500'>Star: <span className='text-red-600'>{star}</span></p>
          <p className='text-xl mr-4 text-gray-500'>Duration: <span className='text-red-600'>{duration}</span></p>
        </div>
        <button onClick={handleDelete} className='p-2 bg-red-600 text-white px-4 py-2 w-full mt-4'>
          Confirm Delete
        </button>
      </div>
    </div>
    </div>
  );
}

export default DeleteMovie;
