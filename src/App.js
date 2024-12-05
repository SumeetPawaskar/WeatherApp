import React, { useState } from "react";
import axios from "axios";


function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const API_KEY = "2af9fa8786a44a54b32105125240512"; // Replace with your actual API key
  const apiUrl = "https://api.weatherapi.com/v1/current.json";

  const handleSearch = async () => {
    if (!city) return;
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get(apiUrl, {
        params: {
          key: API_KEY,
          q: city,
        },
      });
      setWeatherData(response.data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading data…</p>}

      {error && <p>Failed to fetch weather data</p>}

      {weatherData && (
        <div className="weather-cards">
          <div className="weather-card">
            <p>Temperature: {weatherData.current.temp_c}°C</p>
            <p>Humidity: {weatherData.current.humidity}%</p>
            <p>Condition: {weatherData.current.condition.text}</p>
            <p>Wind Speed: {weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
