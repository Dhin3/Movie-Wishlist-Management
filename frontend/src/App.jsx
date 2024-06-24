import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Insert from './pages/insert-movie';
import Show from './pages/show-movie';
import Delete from './pages/delete-movie';
import Update from './pages/update-movie';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies/insert' element={<Insert />} />
        <Route path='/movies/update/:id' element={<Update />} />
        <Route path='/movies/show/:id' element={<Show />} />
        <Route path='/movies/delete/:id' element={<Delete />} />
      </Routes>
    </Router>
  );
};

export default App;
