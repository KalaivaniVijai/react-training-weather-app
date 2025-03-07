import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherInfo.css';

const WeatherInfo = () => {
  const WEATHER_API_GET_BY_CITY_NAME = 'https://api.openweathermap.org/data/2.5/weather?';
  const [city, setCities] = useState('Cologne');
  const [weatherData, setWeatherData] = useState(null); 
  const [unit, setUnit] = useState('F');
  const convertToCelsius = (tempInFahrenheit) => {
    return ((tempInFahrenheit - 32) * 5) / 9;
  };

  const toggleUnit = (selectedUnit) => {
    setUnit(selectedUnit);
  };

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(WEATHER_API_GET_BY_CITY_NAME, {
        params: {
          q: city,
          units: 'imperial',
          appid: process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY,
        },
      });
      setWeatherData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, []);

  const handleInputChange = (e) => {
    setCities(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };
  
  // Calculate the displayed temperature based on the selected unit
  const displayedTemperature =
    weatherData && unit === 'C'
      ? convertToCelsius(weatherData.main.temp).toFixed(1)
      : weatherData?.main.temp.toFixed(1);

  // Handle Enter key to trigger form submission
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchWeatherData();
    }
  };

  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city name"
            value={city}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <div className="input-group-append">
        
          </div>
        </div>
      </form>

      {weatherData ? (
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card">
              <img
                className="card-img-top weather-icon"
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt={weatherData.weather[0].description}
              />
              <div className="card-body">
                <h5 className="card-title">{weatherData.name}</h5>
                <p className="card-text">
                  <strong>Temperature:</strong> {displayedTemperature}°{unit}
                          
          <div className="col-12 text-center my-3">
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
                </p>
                <p className="card-text">
                  <strong>Description:</strong> {weatherData.weather[0].description}
                </p>
                <p className="card-text">
                  <strong>Feels like:</strong> {unit === 'C' ? convertToCelsius(weatherData.main.feels_like).toFixed(1) : weatherData.main.feels_like.toFixed(1)}°{unit}
                </p>
                <p className="card-text">
                  <strong>Humidity:</strong> {weatherData.main.humidity}%
                </p>
                <p className="card-text">
                  <strong>Pressure:</strong> {weatherData.main.pressure}
                </p>
                <p className="card-text">
                  <strong>Wind Speed:</strong> {weatherData.wind.speed} m/s
                </p>

              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center">Please enter a city to get the weather.</p>
      )}
    </div>
  );
};

export default WeatherInfo;