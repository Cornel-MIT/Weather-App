import React, { useEffect, useState } from 'react';
import CurrentWeather from './current-weather/current-weather';
import Forecast from './forecast/forecast';
import { WEATHER_API_URL, WEATHER_API_KEY } from '../api';


const Home = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      const currentWeatherFetch = fetch(
        `${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const forecastFetch = fetch(
        `${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
      );

      Promise.all([currentWeatherFetch, forecastFetch])
        .then(async (response) => {
          const weatherResponse = await response[0].json();
          const forecastResponse = await response[1].json();

          setCurrentWeather(weatherResponse);
          setForecast(forecastResponse);
        })
        .catch(console.log);
    });
  }, []);

  return (
    <div>
      <h2 className='home-title'>Your Weather Forecast For Today</h2>
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
};

export default Home;