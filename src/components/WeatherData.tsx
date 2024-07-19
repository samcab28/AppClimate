import { useFetch } from '../hooks/useFetch';
import { GetUrlDefault } from '../utils/UrlGenerator';

export function WeatherData() {
  const dataForConsume = GetUrlDefault();
  console.log("data for consume: ", dataForConsume);
  const { data, loading, error } = useFetch(dataForConsume);

  return (
    <div>
      <h1>Weather Data</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
