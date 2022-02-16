import React, { useEffect, useState } from 'react';
import './App.css';
import Result from './Result';
import Form from './Form';
import DayTimeWeather from './DayTimeWeather';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { cleanup } from '@testing-library/react';

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
  const [lon, setLon] = useState('');
  const [lat, setLat] = useState('');
  const [dayliWeather, setDayliWeather] = useState('');
  const [isResultActive, setIsResultActive] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${APIKey}&units=metric&lang=${PL_LANG}`;
    const APISecond = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,current,minutely,alerts&appid=${APIKey}&units=metric&lang=${PL_LANG}`;
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
        setLat(data.coord.lat);
        setLon(data.coord.lon);
        setIsResultActive(true);
      })
      .catch((error) => {
        console.log(error);
        setCity(inputValue);
        setError(true);
      });

    fetch(APISecond)
      .then((response) => {
        if (response.ok) {
          return response;
        }
        throw Error('Nie udało się wczytać danych');
      })
      .then((response) => response.json())
      .then((data) => {
        setError(false);
        setDayliWeather(data.daily);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
    return () => {
      cleanup();
    };
  }, [inputValue, lat, lon]);

  const handleOnClickDown = () => {
    setIsResultActive((prev) => !prev);
    navigate('/dayli');
  };

  const handleClickBack = () => {
    navigate('/');
    setIsResultActive((prev) => !prev);
  };

  return (
    <div className='App'>
      <h1>Aplikacja pogodowa</h1>
      <Form value={inputValue} change={handleInputChange} />
      <Routes>
        <Route
          path='/'
          element={
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
              isResultActive={isResultActive}
              handleOnClickDown={handleOnClickDown}
            />
          }
        />
        <Route
          path='/dayli'
          element={
            <DayTimeWeather
              handleClickBack={handleClickBack}
              dayliWeather={dayliWeather}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
