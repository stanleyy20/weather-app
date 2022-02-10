import React from 'react';
import './Result.css';

const Result = ({
  error,
  city,
  sunrise,
  sunset,
  temp,
  pressure,
  wind,
  date,
  inputValue,
  img,
  description,
  timezone,
}) => {
  let content = null;

  if (!error && city) {
    const sunriseTime = new Date(
      (sunrise + timezone - 3600) * 1000
    ).toLocaleString();
    const sunsetTime = new Date(
      (sunset + timezone - 3600) * 1000
    ).toLocaleString();

    const weatherIcon = `http://openweathermap.org/img/wn/${img}@2x.png`;

    content = (
      <React.Fragment>
        <h3>
          {' '}
          Pogoda dla: <em>{city}</em>
        </h3>
        <h4>Dane dla dnia i godziny: {date}</h4>
        <h4>Temperatura: {Math.round(temp)} &#176;C</h4>
        <h4>Wschód słońca: {sunriseTime}</h4>
        <h4>Zachód słońca: {sunsetTime}</h4>
        <h4>Ciśnienie: {pressure} m/s</h4>
        <h4>Prędkość wiatru: {wind} hPa</h4>
        <img src={weatherIcon} alt='weather-icon' />
        <p>{description}</p>
      </React.Fragment>
    );
  }
  let result = error ? `Nie mamy w bazie ${city}` : content;

  if (inputValue.length === 0) {
    result = '';
  }

  return <div className='result'>{result}</div>;
};

export default Result;
