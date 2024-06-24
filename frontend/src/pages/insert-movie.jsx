import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/spinner';  // Ensure spinner is a default export from spinner file
import axios from 'axios';

const InsertMovie = () => {
  const [name, setName] = useState('');
  const [genere, setGenere] = useState('');  // Correct key name as per your collection
  const [director, setDirector] = useState('');
  const [star, setStar] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInsert = () => {
    const data = {
      name,
      genere,
      director,
      star,
      duration
    };
    setLoading(true);
    console.log('Data to be sent:', data);  // Debugging log

    axios.post('http://localhost:5556/movies/', data)
      .then((response) => {
        console.log('Insert successful:', response.data);  // Debugging log
        setLoading(false);
        navigate('/');  // Navigate to home after successful insertion
      })
      .catch((error) => {
        console.log('Error occurred:', error);  // Debugging log
        setLoading(false);
        alert('Error occurred');
      });
  };

  return (

    <div className='p-4 bg-gray-100'>
    <Link to="/" className="back-link mb-4 block w-[100px]">
          <span className="back-icon">←</span> Back
        </Link>
    <div className="flex justify-center items-center min-h-screen ">
    
      <div className="border-2 border-sky-600 rounded-xl p-6 w-[600px] bg-white shadow-md">
      

        <h1 className='text-3xl my-4 text-center'>Insert Movie</h1>
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

        <button onClick={handleInsert} className='p-2 bg-sky-300 px-4 py-2 w-full'>
          Save
        </button>
      </div>
    </div>
    </div>
  );
}

export default InsertMovie;
