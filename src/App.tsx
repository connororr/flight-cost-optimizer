import './App.css';
import { DataProvider } from './context/DataContext';
import FlightInput from './components/ui/flight-input';
import React from 'react';
import Itineraries from './components/ui/itineraries/itineraries';
import IataCodeSearch from "@/components/ui/iata-code-search/iata-code-search";
import { ApiServiceProvider } from "@/context/ApiServiceContext";
import logoNoImage from './assets/images/logo-no-image.png';
function App() {
  return (
    <div className="App">
    <img src={logoNoImage} alt="exploria logo" width="235" />
      <DataProvider>
        <ApiServiceProvider>
            <IataCodeSearch />
            <FlightInput />
            <Itineraries />
        </ApiServiceProvider>
      </DataProvider>
    </div>
  );
}

export default App;
