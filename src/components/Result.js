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
    ).toLocaleTimeString();
    const sunsetTime = new Date(
      (sunset + timezone - 3600) * 1000
    ).toLocaleTimeString();

    const weatherIcon = `http://openweathermap.org/img/wn/${img}@2x.png`;

    content = (
      <React.Fragment>
        <h3> {date}</h3>
        <img src={weatherIcon} alt='weather-icon' />
        <p>{description}</p>
        <h4>{Math.round(temp)} &#176;C</h4>
        {city}
        <h4>Wschód słońca: {sunriseTime}</h4>
        <h4>Zachód słońca: {sunsetTime}</h4>
        <h4>Ciśnienie: {pressure} m/s</h4>
        <h4>Prędkość wiatru: {wind} hPa</h4>
      </React.Fragment>
    );
  }
  let result = error ? <h3>Nie mamy w bazie {city}</h3> : content;

  if (inputValue.length === 0) {
    result = '';
    return <div></div>;
  }

  return <div className='result'>{result}</div>;
};

export default Result;
