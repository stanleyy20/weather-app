import React, { useEffect, useState } from 'react';
import './App.css';
import Result from './Result';
import Form from './Form';

// Klucz do API
const APIKey = `d5ef99401ff5b94d28e426238d4d9881`;
const PL_LANG = 'pl';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
  const [temp, setTemp] = useState('');
  const [pressure, setPressure] = useState('');
  const [wind, setWind] = useState('');
  const [error, setError] = useState('');
  const [description, setDecryption] = useState('');
  const [img, setImg] = useState([]);
  const [timezone, setTimezone] = useState(0);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${APIKey}&units=metric&lang=${PL_LANG}`;
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
        setDecryption(data.weather[0].description);
        setImg(data.weather[0].icon);
        setTimezone(data.timezone);
      })
      .catch((error) => {
        console.log(error);
        setCity(inputValue);
        setError(true);
      });
  }, [inputValue]);

  return (
    <div className='App'>
      <h1>Aplikacja pogodowa</h1>
      <Form value={inputValue} change={handleInputChange} />
      <Result
        date={date}
        city={city}
        sunrise={sunrise}
        sunset={sunset}
        pressure={pressure}
        wind={wind}
        temp={temp}
        error={error}
        inputValue={inputValue}
        img={img}
        description={description}
        timezone={timezone}
      />
    </div>
  );
};

export default App;
