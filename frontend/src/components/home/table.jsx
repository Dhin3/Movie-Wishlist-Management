import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import { BsInfoCircle } from 'react-icons/bs';

const Table = ({ movies }) => {
  return (
    <table className='w-full border-separate border-spacing-2 flex-center'>
      <thead>
        <tr>
          <th className='border border-slate-600 rounded-md'>No</th>
          <th className='border border-slate-600 rounded-md'>Name</th>
          {/* <th className='border border-slate-600 rounded-md'>Genre</th>
          <th className='border border-slate-600 rounded-md'>Director</th> */}
          <th className='border border-slate-600 rounded-md'>Star</th>
          {/* <th className='border border-slate-600 rounded-md'>Duration</th> */}
          <th className='border border-slate-600 rounded-md'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie, index) => (
          <tr key={movie._id} className='h-8 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg'>
            <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
            <td className='border border-slate-700 rounded-md text-center'>{movie.name}</td>
            {/* <td className='border border-slate-700 rounded-md text-center'>{movie.genere}</td>
            <td className='border border-slate-700 rounded-md text-center'>{movie.director}</td> */}
            <td className='border border-slate-700 rounded-md text-center'>{movie.star}</td>
            {/* <td className='border border-slate-700 rounded-md text-center'>{movie.duration}</td> */}
            <td className='border border-slate-700 rounded-md text-center'>
              <div className='flex justify-center gap-x-4'>
                <Link to={`/movies/show/${movie._id}`}>
                  <BsInfoCircle className='text-2xl text-green-600 hover:text-green-800 text-2xl' />
                </Link>
                <Link to={`/movies/update/${movie._id}`}>
                  <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-yellow-800 text-2xl' />
                </Link>
                <Link to={`/movies/delete/${movie._id}`}>
                  <MdOutlineDelete className='text-2xl text-red-600 hover:text-red-800 text-2xl' />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
