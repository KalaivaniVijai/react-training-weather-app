import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './WeatherInfo.css';

const DashBoard = () => {
  const WEATHER_API_GET_BY_CITY_NAME = 'https://api.openweathermap.org/data/2.5/weather?';

  const [citiesArray, setCitiesArray] = useState(['Cologne', 'Chennai', 'Delhi', 'New York', 'Tokyo']);
  const [weatherData, setWeatherData] = useState([]);
  const [unit, setUnit] = useState('F');
  const [newCity, setNewCity] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const convertToCelsius = (tempInFahrenheit) => {
    return ((tempInFahrenheit - 32) * 5) / 9;
  };

  const toggleUnit = (selectedUnit) => {
    setUnit(selectedUnit);
  };

  const fetchWeatherData = async (city) => {
    try {
      const response = await axios.get(WEATHER_API_GET_BY_CITY_NAME, {
        params: {
          q: city,
          units: 'imperial',
          appid: process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return { error: `Failed to fetch data for ${city}.` };
    }
  };

  useEffect(() => {
    const getWeatherDataForCities = async () => {
      setError('');
      const weatherResults = await Promise.all(citiesArray.map((city) => fetchWeatherData(city)));
      const validResults = weatherResults.filter((data) => data !== null && !data.error);
      if (validResults.length === 0) setError('No weather data available.');
      setWeatherData(validResults);
    };

    if (citiesArray.length > 0) {
      getWeatherDataForCities();
    } else {
      setWeatherData([]);
    }
  }, [citiesArray]);

  const displayedTemperature = (tempInFahrenheit) => {
    return (unit === 'C' ? convertToCelsius(tempInFahrenheit) : tempInFahrenheit).toFixed(1);
  };

  const handleNewCitySubmit = (e) => {
    e.preventDefault();
    const trimmedCity = newCity.trim();
    if (trimmedCity && !citiesArray.includes(trimmedCity)) {
      setCitiesArray((prevCities) => [trimmedCity, ...prevCities]);
      setNewCity('');
    }
  };

  const handleDeleteCity = (city) => {
    setCitiesArray((prevCities) => prevCities.filter((existingCity) => existingCity !== city));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && newCity) {
      fetchWeatherData(newCity);
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const regex = /[^a-zA-Z\s]/g;

    if (!regex.test(inputValue)) {
      setNewCity(inputValue);
    }
  };

  const goToWeatherDetails = (cityName) => {
    navigate(`/weather-details/${cityName}`);
  };

  return (
    <div className="container my-5">
      <form onSubmit={handleNewCitySubmit} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new city name"
            value={newCity}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </form>

      <div className="text-center my-3">
        <button
          onClick={() => toggleUnit('C')}
          className={`btn btn-outline-${unit === 'C' ? 'primary' : 'secondary'} mx-2`}
        >
          Celsius
        </button>
        <span> | </span>
        <button
          onClick={() => toggleUnit('F')}
          className={`btn btn-outline-${unit === 'F' ? 'primary' : 'secondary'} mx-2`}
        >
          Fahrenheit
        </button>
      </div>

      {error && <p className="text-center text-danger">{error}</p>}

      {citiesArray.length > 0 && weatherData.length === 0 && !error && (
        <p className="text-center">Loading weather data...</p>
      )}

      <div className="row">
        {weatherData.length > 0 ? (
          weatherData.map((cityData) => (
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={cityData.id}>
              <div className="card" onClick={() => goToWeatherDetails(cityData.name)}>
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5>{cityData.name}</h5>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCity(cityData.name);
                    }}>
                    Remove
                  </button>
                </div>

                <div className="card-body">
                  <div className="row">
                    <div className="col-6 left-side">
                      <img
                        className="weather-icon"
                        src={`http://openweathermap.org/img/wn/${cityData.weather[0].icon}.png`}
                        alt={cityData.weather[0].description}
                      />
                      <p>
                        <strong>Temp:</strong> {displayedTemperature(cityData.main.temp)}°{unit}
                      </p>
                    </div>

                    <div className="col-6 right-side">
                      <p><strong>Weather Summary:</strong> {cityData.weather[0].description}</p>
                      <p><strong>Low Temp:</strong> {displayedTemperature(cityData.main.temp_min)}°{unit}</p>
                      <p><strong>High Temp:</strong> {displayedTemperature(cityData.main.temp_max)}°{unit}</p>
                      <p><strong>Humidity:</strong> {cityData.main.humidity}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No cities to display. Add a city to start.</p>
        )}
      </div>
    </div>
  );
};

export default DashBoard;