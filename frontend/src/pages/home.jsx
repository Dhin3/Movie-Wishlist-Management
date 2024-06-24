import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import Spinner from '../components/spinner'; // Adjust import path as necessary
import Table from '../components/home/table';
import Card from '../components/home/card';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    axios.get('http://localhost:5556/movies')
      .then((response) => {
        setMovies(response.data.movies);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error loading movies: {error.message}</div>;
  }

  return (
    <div className='p-4'>
      <div className='flex justify-center gap-x-4 mb-4'>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl'>Movie Wish List</h1>
        <Link to='/movies/insert'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      <div className='flex justify-center'>
        {showType === 'table' ? <Table movies={movies} /> : <Card movies={movies} />}
      </div>
    </div>
  );
}

export default Home;
