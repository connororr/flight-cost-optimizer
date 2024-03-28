import './App.css';
import { DataProvider } from './context/DataContext';
import FlightInput from './components/ui/flight-input/flight-input';
import React from 'react';
import Itineraries from './components/ui/itineraries/itineraries';

function App() {
  return (
    <div className="App">
      <DataProvider>
        <FlightInput />
        <Itineraries />
      </DataProvider>
    </div>
  );
}

export default App;
