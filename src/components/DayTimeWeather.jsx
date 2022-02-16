import React from 'react';
import './DayTimeWeather.css';

const DayTimeWeather = ({ dayliWeather, handleClickBack }) => {
  let dayliTemp = null;
  let dayliDate = null;
  let days = null;
  let icons = null;

  if (Boolean(dayliWeather)) {
    dayliTemp = dayliWeather.map((day) => (
      <h3>{Math.floor(day.temp.day)}&#176;C</h3>
    ));
    dayliDate = dayliWeather.map((day) =>
      new Date(day.dt * 1000).toUTCString()
    );
    days = dayliDate.map((day) => (
      <h3>
        {new Date(day).getUTCDate()}.{new Date(day).getUTCMonth() + 1}
      </h3>
    ));

    icons = dayliWeather.map((icon) => (
      <div className='ico'>
        {' '}
        <img
          src={`http://openweathermap.org/img/wn/${icon.weather[0].icon}@2x.png`}
          alt='weather-icon'
        />
      </div>
    ));
  }

  const content = (
    <React.Fragment>
      <h3>Prognoza na kolejne dni</h3>
      <div className='resultDayli'>
        <div className='days'>{days} </div>
        <div className='icons'>{icons} </div>
        <div className='temp'>{dayliTemp}</div>
      </div>
      <button onClick={handleClickBack}>Powrót</button>
    </React.Fragment>
  );

  return content;
};

export default DayTimeWeather;
