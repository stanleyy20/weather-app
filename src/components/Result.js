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
  isResultActive,
  handleOnClickDown,
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

    content = isResultActive ? (
      <React.Fragment>
        <div className='result'>
          <h3> {date}</h3>
          <img src={weatherIcon} alt='weather-icon' />
          <h3>{description}</h3>
          <h4 className='temp'>{Math.round(temp)} &#176;C</h4>
          <h4>Wschód słońca: {sunriseTime}</h4>
          <h4>Zachód słońca: {sunsetTime}</h4>
          <h4>Ciśnienie: {pressure} hPa</h4>
          <h4>Prędkość wiatru: {wind} m/s</h4>
        </div>
        <button onClick={handleOnClickDown}>Prognoza na 7 dni</button>
      </React.Fragment>
    ) : null;
  }

  let result = error ? <h3>Nie mamy w bazie {city}</h3> : content;

  if (inputValue.length === 0) {
    result = '';
    return <div></div>;
  }

  return result;
};

export default Result;
