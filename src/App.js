import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashBoard from './dashBoard';
import WeatherDetails from './weatherDetails';
import Banner from './banner'

const App = () => {
    return (
      <Router>
        <Banner></Banner>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/weather-details/:cityName" element={<WeatherDetails />} />
        </Routes>
      </Router>
    );
  };
  
export default App;