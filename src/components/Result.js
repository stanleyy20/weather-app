import React from 'react';
import './Result.css';

const Result = (props) => {
  const { err, city, sunrise, sunset, temp, pressure, wind, date } =
    props.weather;

  let content = null;

  if (!err && city) {
    const sunriseTime = new Date(sunrise * 1000).toLocaleString();
    const sunsetTime = new Date(sunset * 1000).toLocaleString();

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
      </React.Fragment>
    );
  }

  return (
    <div className='result'>{err ? `Nie mamy w bazie ${city}` : content}</div>
  );
};

export default Result;
