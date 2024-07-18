import { Suspense } from 'react';
import './App.css';
import { SelectUbication } from './components/SelectUbication';
import { WeatherData } from './components/WeatherData';



function App() {
  return (
    <div className="App">
      <h1>Web App</h1>
      <SelectUbication/>
      <Suspense fallback={<div>Loading...</div>}>
        <WeatherData />
      </Suspense>
    </div>
  );
}

export default App;
