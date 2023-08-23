import React, { useState } from "react";
import axios from "axios";
import "./styles.css";
export default function Form() {
  let [city, setCity] = useState("");
  let [text, setText] = useState("");
  let [temperature, setTemperature] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [description, setDescription] = useState(null);
  let [wind, setWind] = useState(null);
  let [icon, setIcon] = useState(null);

  //----------------------------------
  function weatherAtr(response) {
    setDescription(response.data.weather[0].description);
    setWind(response.data.wind.speed);
    setTemperature(Math.round(response.data.main.temp));
    setHumidity(response.data.main.humidity);
    setIcon(
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }

  function submitSearch(event) {
    event.preventDefault();
    let tempCity = `${city}`;
    setText(tempCity);
    let unit = "metric";
    let apiKey = "52762f86df418f479f71739bf7d198db";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    axios.get(url).then(weatherAtr);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  //------------------------------------
  return (
    <form className="mb-3" onSubmit={submitSearch}>
      <div className="row">
        <div className="col-9">
          <input
            onChange={updateCity}
            type="search"
            placeholder="Type a city.."
            className="form-control"
            autoComplete="off"
          />
        </div>
        <div className="col-3">
          <input
            type="submit"
            value="Search"
            className="btn btn-primary w-100"
          />
        </div>
      </div>
      <br />
      <h2>
        <strong>{text}</strong>
      </h2>
      <div className="overview">
        <ul>
          <li>Description: {description}</li>
        </ul>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="clearfix weather-temperature">
            <img src={icon} alt={description} className="float-left" />
            <div className="float-left">
              <strong className="degree">{temperature}</strong>
              <span className="units">
                <a href="/">°C</a> | <a href="/">°F</a>
              </span>
            </div>
          </div>
        </div>
        <div className="col-6">
          <ul>
            <li>Humidity: {humidity}%</li>
            <li>Wind: {wind}km/h</li>
          </ul>
        </div>
      </div>
    </form>
  );
}
