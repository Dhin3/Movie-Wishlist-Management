import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import { BsInfoCircle } from 'react-icons/bs';

const CardView = ({ movies }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {movies.map((movie) => (
        <div key={movie._id} className='border border-gray-200 rounded-lg overflow-hidden bg-white shadow-md hover:shadow-xl transform transition duration-300 hover:scale-105'>
          <div className='p-6'>
            <h2 className='text-xl font-semibold mb-2'>{movie.name}</h2>
            <p className='text-gray-600 mb-2'>Star: {movie.star}</p>
            <div className='flex justify-around mt-4'>
              <Link to={`/movies/show/${movie._id}`}>
                <BsInfoCircle className='text-green-600 hover:text-green-800 text-2xl' />
              </Link>
              <Link to={`/movies/update/${movie._id}`}>
                <AiOutlineEdit className='text-yellow-600 hover:text-yellow-800 text-2xl' />
              </Link>
              <Link to={`/movies/delete/${movie._id}`}>
                <MdOutlineDelete className='text-red-600 hover:text-red-800 text-2xl' />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardView;
