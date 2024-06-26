import './App.css';
import { DataProvider } from './context/DataContext';
import FlightInput from './components/ui/flight-input';
import React from 'react';
import Itineraries from './components/ui/itineraries/itineraries';
import { ApiServiceProvider } from '@/context/ApiServiceContext';
import logoNoImage from './assets/images/logo-no-image.png';
function App() {
    return (
        <div className="App">
            <img
                src={logoNoImage}
                alt="exploria logo"
                width="235"
                className="pt-[10px] pl-[10px]"
            />
            <DataProvider>
                <ApiServiceProvider>
                    <FlightInput />
                    <Itineraries />
                </ApiServiceProvider>
            </DataProvider>
        </div>
    );
}

export default App;
