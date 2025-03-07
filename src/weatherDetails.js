import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './weatherDetails.module.css';

const WeatherDetails = () => {
  const { cityName } = useParams();
  const WEATHER_API_GET_BY_CITY_NAME = 'https://api.openweathermap.org/data/2.5/weather?';
  const WEATHER_API_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast?';
  
  const [cityData, setCityData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [unit, setUnit] = useState('F');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const convertToCelsius = (tempInFahrenheit) => {
    return ((tempInFahrenheit - 32) * 5) / 9;
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
      setCityData(response.data);
    } catch (error) {
      setError('Failed to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  const fetchForecastData = async (city) => {
    try {
      const response = await axios.get(WEATHER_API_FORECAST, {
        params: {
          q: city,
          units: 'imperial',
          appid: process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY,
        },
      });
      setForecastData(response.data);
    } catch (error) {
      setError('Failed to fetch forecast data.');
    }
  };

  useEffect(() => {
    fetchWeatherData(cityName);
    fetchForecastData(cityName);
  }, [cityName, unit]);

  const displayedTemperature = (temp) => {
    return unit === 'C' ? convertToCelsius(temp).toFixed(1) : temp.toFixed(1);
  };

  const goBackToDashboard = () => {
    navigate('/');
  };

  const toggleUnit = (newUnit) => {
    setUnit(newUnit);
  };

  const getWeatherClass = (weatherDescription) => {
    if (weatherDescription.includes('sunny') || weatherDescription.includes('clear')) {
      return 'sunny';
    } else if (weatherDescription.includes('cloud')) {
      return 'cloudy';
    } else if (weatherDescription.includes('rain')) {
      return 'rainy';
    } else if (weatherDescription.includes('snow')) {
      return 'snowy';
    } else if (weatherDescription.includes('storm')) {
      return 'stormy';
    } else {
      return '';
    }
  };

  return (
<div className="container my-5">
  {error && <p className="text-danger text-center">{error}</p>}

  {loading ? (
    <p className="text-center">Loading weather details...</p>
  ) : (
    cityData && (
      <div className={`card ${getWeatherClass(cityData.weather[0].description)}`}>
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="card-title">{cityData.name}</h5>
          <button onClick={goBackToDashboard} className="btn btn-secondary btn-sm">
            Back to Dashboard
          </button>
        </div>

        <div className="card-body d-flex">
          <div className="left-section d-flex flex-column align-items-center">
            <img
              className="weather-icon"
              src={`http://openweathermap.org/img/wn/${cityData.weather[0].icon}.png`}
              alt={cityData.weather[0].description}
            />
            <p className="temperature mt-2">
              {displayedTemperature(cityData.main.temp)}°{unit}
            </p>

            <div className="unit-toggle">
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
          </div>

          <div className="right-section">
            <p className="description">
              <strong>Description:</strong> {cityData.weather[0].description}
            </p>
            <p>
              <strong>Feels Like:</strong> {displayedTemperature(cityData.main.feels_like)}°{unit}
            </p>
            <p>
              <strong>Humidity:</strong> {cityData.main.humidity}%
            </p>
            <p>
              <strong>Pressure:</strong> {cityData.main.pressure} hPa
            </p>
            <p>
              <strong>Wind Speed:</strong> {cityData.wind.speed} m/s
            </p>
          </div>
        </div>

        {forecastData && (
          <div className="mt-5">
            <h3>5-Day Forecast</h3>
            <div className="row">
              {forecastData.list.map((forecast, index) => {
                if (index % 8 === 0) {
                  return (
                    <div className="col-lg-2 col-md-4 col-sm-6 mb-4" key={forecast.dt}>
                      <div className={`card forecast-card ${getWeatherClass(forecast.weather[0].description)}`}>
                        <img
                          className="card-img-top weather-icon"
                          src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                          alt={forecast.weather[0].description}
                        />
                        <div className="card-body text-center">
                          <h5 className="card-title">
                            {new Date(forecast.dt * 1000).toLocaleDateString()}
                          </h5>
                          <p className="card-text">
                            {displayedTemperature(forecast.main.temp)}°{unit}
                          </p>
                          <p className="card-text">{forecast.weather[0].description}</p>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}
      </div>
    )
  )}
</div>

  
  );
};

export default WeatherDetails;