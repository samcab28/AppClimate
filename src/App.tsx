import React, { Suspense } from 'react';
import './App.css';
import { fetchData } from './utils/FetchData';

// Define a resource using fetchData
const apiDataResource = fetchData("https://api.open-meteo.com/v1/forecast?latitude=10.0159&longitude=84.2142&current=wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,weather_code,surface_pressure,visibility,uv_index");

const WeatherData = () => {
  const data = apiDataResource.read(); // This will suspend until the data is ready
  return (
    <div>
      <h1>Weather Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <h1>Web App</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <WeatherData />
      </Suspense>
    </div>
  );
}

export default App;
