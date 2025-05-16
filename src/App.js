import React, {useState,useEffect} from 'react';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState(
  JSON.parse(localStorage.getItem('history')) || []
);
useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const { latitude, longitude } = coords;
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );
        const data = await res.json();
        setWeather(data);
      } catch {}
    });
  }
}, []);

  const API_KEY = "30aa4bf7824dd52b48acd03fab5ca13b"; 
      let weatherClass = '';
    if (weather) {
    const main = weather.weather[0].main.toLowerCase();
    if (main.includes("cloud")) weatherClass = 'cloudy';
    else if (main.includes("rain")) weatherClass = 'rainy';
    else if (main.includes("clear")) weatherClass = 'clear';
    else if (main.includes("sun")) weatherClass = 'sunny';
    }
  const getWeather = async (customCity) => {
  const query = customCity || city; // Use customCity if passed, else fallback to input
  if (!query) return;

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
    );
    if (!res.ok) throw new Error("City not found");

    const data = await res.json();
    setWeather(data);
    setError('');

    // Update history
    setHistory(prev => {
      if (!prev.includes(query)) return [query, ...prev.slice(0, 4)];
      return prev;
    });

  } catch (err) {
    setWeather(null);
    setError(err.message);
  }
};

  return (
    <div className={`container ${weatherClass}`}>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="get-weather" onClick={() => getWeather()}>Get Weather</button>


      <div className="history-buttons">
        {history.map((c, i) => (
          <button key={i} onClick={() => getWeather(c)}>
            {c}
          </button>
        ))}
      </div>


      {error && <p className="error">{error}</p>}

      {weather && (
  <div className="weather-info">
    <div className="weather-main">
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
        alt="weather icon"
        className="weather-icon"
      />
      <div className="temp-container">
        <div className="temperature">
          {Math.round(weather.main.temp)}<span>°C</span>
        </div>
        <div className="realfeel">
          RealFeel {Math.round(weather.main.feels_like)}°
        </div>
      </div>
    </div>

    <div className="weather-details">
      <div><span>Condition</span><span>{weather.weather[0].main}</span></div>
      <div><span>Humidity</span><span>{weather.main.humidity}%</span></div>
      <div><span>Wind</span><span>{weather.wind.speed} m/s</span></div>
      <div><span>Last updated</span><span>{new Date().toLocaleTimeString()}</span></div>
    </div>
  </div>
)}

    </div>
  );
};

export default App;

