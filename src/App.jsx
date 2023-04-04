import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Landing, Error, Register, Dashboard } from './pages';

import React from 'react';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='landing' element={<Landing />} />
        <Route path='register' element={<Register />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
