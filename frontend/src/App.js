import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import CarList from './components/CarList';
import CarDetail from './components/CarDetail';
import BookingForm from './components/BookingForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<CarList />} />
          <Route path="/cars/:id" element={<CarDetail />} />
          <Route path="/book/:carId" element={<BookingForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
