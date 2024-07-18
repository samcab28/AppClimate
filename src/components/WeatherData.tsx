import { fetchData } from '../utils/FetchData.ts';


//Put the URL to get
const apiDataResource = fetchData("https://api.open-meteo.com/v1/forecast?latitude=10.0159&longitude=84.2142&current=wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,weather_code,surface_pressure,visibility,uv_index");


export function WeatherData() {
  const data = apiDataResource.read();
  return (
    <div>
      <h1>Weather Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}