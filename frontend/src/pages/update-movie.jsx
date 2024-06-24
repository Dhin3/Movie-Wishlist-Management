import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/spinner';  // Ensure spinner is a default export from spinner file
import axios from 'axios';

const UpdateMovie = () => {
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

  const handleUpdate = () => {
    const data = {
      name,
      genere,
      director,
      star,
      duration
    };
    setLoading(true);
    console.log('Data to be sent:', data);

    axios.put(`http://localhost:5556/movies/${id}`, data)
      .then((response) => {
        console.log('Update successful:', response.data);
        setLoading(false);
        navigate('/');  // Navigate to home after successful update
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
    <div className='p-4 bg-gray-100 '>
        <Link to="/" className="back-link mb-4 block w-[100px] ">
          <span className="back-icon">←</span> Back
        </Link>
    <div className="flex justify-center items-center min-h-screen ">
      <div className="border-2 border-sky-600 rounded-xl p-6 w-[600px] bg-white shadow-md">
        

        <h1 className='text-3xl my-4 text-center'>Update Movie</h1>
        {loading ? <Spinner /> : ''}

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Name</label>
          <input 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Genere</label>
          <input 
            value={genere} 
            onChange={(e) => setGenere(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Director</label>
          <input 
            value={director} 
            onChange={(e) => setDirector(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Star</label>
          <input 
            value={star} 
            onChange={(e) => setStar(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Duration</label>
          <input 
            value={duration} 
            onChange={(e) => setDuration(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <button onClick={handleUpdate} className='p-2 bg-sky-300 px-4 py-2 w-full'>
          Update
        </button>
      </div>
    </div>
    </div>
  );
}

export default UpdateMovie;
