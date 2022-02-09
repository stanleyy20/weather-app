import React, { Component } from 'react';
import './App.css';
import Result from './Result';
import Form from './Form';

// Klucz do API
const APIKey = `45e2ab9f10ea6eae91f2a1780759a4fc`;

class App extends Component {
  state = {
    value: '',
    date: '',
    city: '',
    sunrise: '',
    sunset: '',
    temp: '',
    pressure: '',
    wind: '',
    err: '',
  };

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  // prevProps i prevState to zabezpieczenie przed pętlą nieskończopności gdy użyjemy setState w componentDidMount
  componentDidUpdate(prevProps, prevState) {
    if (this.state.value.length === 0) return;
    if (prevState.value !== this.state.value) {
      const API = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${APIKey}&units=metric`;
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
          this.setState((prevState) => ({
            err: false,
            date: time,
            city: prevState.value,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            temp: data.main.temp,
            pressure: data.main.pressure,
            wind: data.wind.speed,
          }));
        })
        .catch((err) => {
          console.log(err);
          this.setState((prevState) => ({
            err: true,
            city: prevState.value,
          }));
        });
    }
  }

  render() {
    return (
      <div className='App'>
        Aplikacja pogodowa
        <Form value={this.state.value} change={this.handleInputChange} />
        <Result weather={this.state} />
      </div>
    );
  }
}

export default App;
