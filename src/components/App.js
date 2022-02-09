import React, { useState } from 'react';
import './App.css';
import Result from './Result';
import Form from './Form';

// Klucz do API
const APIKey = `45e2ab9f10ea6eae91f2a1780759a4fc`;

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
  const [temp, setTemp] = useState('');
  const [pressure, setPressure] = useState('');
  const [wind, setWind] = useState('');
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCitySubmit = (e) => {
    e.preventDefault();
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${APIKey}&units=metric`;
    fetch(API)
      .then((response) => {
        if (response.ok) {
          return response;
        }
        throw Error('Nie udało się wczytać danych');
      })
      .then((response) => response.json())
      .then((data) => {
        const time = new Date().toLocaleString();
        setError(false);
        setDate(time);
        setCity(inputValue);
        setSunrise(data.sys.sunrise);
        setSunset(data.sys.sunset);
        setTemp(data.main.temp);
        setPressure(data.main.pressure);
        setWind(data.wind.speed);
      })
      .catch((error) => {
        console.log(error);
        setCity(inputValue);
        setError(true);
      });
  };

  return (
    <div className='App'>
      Aplikacja pogodowa
      <Form
        value={inputValue}
        change={handleInputChange}
        submit={handleCitySubmit}
      />
      <Result
        date={date}
        city={city}
        sunrise={sunrise}
        sunset={sunset}
        pressure={pressure}
        wind={wind}
        temp={temp}
        error={error}
      />
    </div>
  );
};

export default App;
