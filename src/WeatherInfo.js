import React, {  useState, useEffect } from 'react';
import axios from 'axios';

const WeatherInfo = () =>{
    const WEATHER_API_GET_BY_CITY_NAME ='https://api.openweathermap.org/data/2.5/weather?';

//This state holds the current value of the city entered by the user in the input field. It is initially set to 'Cologne' city in Germany.
    const [city,setCity] = useState('Cologne');

//This state stores the weather data returned from the weathermap API after a successful fetch. 
// It is initially set to null, which means no data is available until the user submits a city.

const [weatherData, setWeatherData] = useState(null);

const fetchWeatherData = async() =>{
    try{
        const response = await axios.get(WEATHER_API_GET_BY_CITY_NAME,{
            params:{
                q:city,
                appid:process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY
            }
        });
        setWeatherData(response.data);
        console.log(response.data);
    }catch(error){
        console.error(error);
    }
};

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

return (
    <div>
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit">Get Weather</button>
      </form>

      {weatherData ? (
        <>
        <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt={weatherData.weather[0].description} />
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <p>Feels like : {weatherData.main.feels_like}°C</p>
          <p>Humidity : {weatherData.main.humidity}%</p>
          <p>Pressure : {weatherData.main.pressure}</p>
          <p>Wind Speed : {weatherData.wind.speed}m/s</p>
        </>
      ) : (
        <p>Please enter a city to get the weather.</p>
      )}

    {/*   <button onClick={fetchWeatherData}>
        Show Weather
      </button> */}
    </div>
  );
}

export default WeatherInfo;