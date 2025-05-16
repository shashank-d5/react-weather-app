# Weather App

A responsive weather forecast application built with **React.js**. It allows users to fetch and view real-time weather data for their current location or any city they search for.

## Features

- Auto location-based weather on app load using browser's Geolocation API
- City-based search for weather data
- Real-time weather updates
- History of searched cities (saved in localStorage)
- Dynamic weather background styles
- Fully responsive design

## Technologies Used

- React.js
- JavaScript (ES6)
- CSS3
- OpenWeatherMap API

## Setup Instructions

1. **Clone this repository**  
   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
2. **Install dependencies**
    npm install

3. **Add your OpenWeatherMap API key**
   In src/App.js, replace the placeholder:
    const API_KEY = "YOUR_API_KEY_HERE";

4. **Start the app**
    npm start

5. **Project Structure**

    weather-app/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    ├── package.json
    └── README.md
