import { useData } from '@/context/DataContext';
import FlightDetails from '../flight-details/flight-details';
import React from 'react';
import FlightDetailsLoading from '../flight-details-loading/flight-details-loading';

export default function Itineraries() {
    const data = useData();
    const timesToRepeat: number = 6;

    if (!data.itineraries && data.loading) {
        return (
            <>
                {[...Array(timesToRepeat)].map(() => (
                    <FlightDetailsLoading />
                ))}
            </>
        );
    }
    if (
        !data.itineraries ||
        !Array.isArray(data.itineraries) ||
        data?.itineraries.length === 0
    ) {
        return null;
    }

    return (
        <div>
            {data.itineraries.map((itinerary) => (
                <FlightDetails itinerary={itinerary} />
            ))}
        </div>
    );
}
