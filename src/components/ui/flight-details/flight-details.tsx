import React from 'react';
import { CardContent, CardFooter, Card } from '@/components/shadcn/card';

interface FlightDetailsProps {
    flightDetailsData: {
        itinerary: {
            departureTime: string;
            arrivalTime: string;
            departureLocation: string;
            arrivalLocation: string;
            stops: number;
            stopLocation: string;
            duration: string;
        }[];
        price: string;
    };
}

const FlightDetails: React.FC<FlightDetailsProps> = ({ itinerary }) => {
    return (
        <Card
            className="w-full max-w-3xl bg-white p-4 shadow-lg flex m-[10px]"
            data-testid="flight-details"
        >
            <CardContent className="flex-1">
                {itinerary.flightLegs.map((leg, index) => {
                    const departureTime = leg.segments.at(0)?.departure.at;
                    const arrivalTime = leg.segments.at(-1)?.arrival.at;
                    let stopovers = 'Direct';
                    let stopoverLocations = '';
                    if (leg.numberOfStopovers > 0) {
                        stopovers = `${leg.numberOfStopovers} stop${leg.numberOfStopovers !== 1 ? 's' : ''}`;
                    }
                    if (leg.segments.length > 1) {
                        for (let i = 0; i < leg.segments.length - 1; i++) {
                            if (i === leg.segments.length - 2) {
                                stopoverLocations += `${leg.segments[i].arrival.iataCode}`;
                            } else {
                                stopoverLocations += `${leg.segments[i].arrival.iataCode}, `;
                            }
                        }
                    }

                    return (
                        <div
                            key={index}
                            className={`flex items-center justify-between ${index > 0 ? 'border-t border-gray-200' : ''} pt-4`}
                            data-testid="flight-leg"
                        >
                            <div className="flex items-center space-x-4">
                                <PlaneIcon className="h-6 w-6" />
                                <div>
                                    <p className="font-semibold">
                                        {departureTime} – {arrivalTime}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {leg.from} - {leg.to}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p className="font-semibold">{stopovers}</p>
                                <p className="text-sm text-gray-600">
                                    {stopoverLocations}
                                </p>
                            </div>
                            <p className="font-semibold">{leg.duration}</p>
                        </div>
                    );
                })}
            </CardContent>
            <CardFooter className="flex flex-col justify-center ml-4 border-l border-gray-200">
                <p className="font-semibold text-lg">{itinerary.cost}</p>
                {/* TODO: add the button only when you have a page to detail each flight */}
                {/* <Button className="bg-blue-500 hover:bg-blue-600 text-white">View Deal</Button> */}
            </CardFooter>
        </Card>
    );
};

function PlaneIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
        </svg>
    );
}

export default FlightDetails;
