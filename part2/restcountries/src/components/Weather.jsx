import { useState, useEffect } from 'react';
import weatherService from '../services/weather';

const Weather = ({ capital }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        weatherService
            .getAll(capital)
            .then(data => setWeather(data));
    }, [capital]);

    const iconUrl = 'https://openweathermap.org/img/wn/';

    if (weather === null)
        return null;

    return (
        <div>
            <h2>Weather in {capital}</h2>
            <div>temperature {weather.main.temp} Celsius</div>
            <img
                src={`${iconUrl}${weather.weather[0].icon}@2x.png`}
            />
            <div>wind {weather.wind.speed} m/s</div>
        </div>
    );
};

export default Weather;