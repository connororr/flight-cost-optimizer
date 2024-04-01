import {DataProvider, useData} from "@/context/DataContext";
import {FlightLeg, Itinerary, Segment} from "@/constants/response";
import { render, screen, waitFor} from "@testing-library/react";
import user from "@testing-library/user-event";

const mockItinerary = createItinerary();

const TestComponent = () => {
    const { loading, itineraries, setInProgress, setFetchedData } = useData();

    return (
        <>
            <p>is loading: {`${loading}`}</p>
            <p>itineraries exist: {`${!!itineraries}`}</p>
            <button onClick={() => setInProgress(!loading)}>setInProgress</button>
            <button onClick={() => setFetchedData([mockItinerary])}>setFetchedData</button>
        </>
    )
}
describe('DataContext', () => {
    describe('loading', () => {
        it('should be instantiated', async () => {
            render(
                <DataProvider>
                    <TestComponent />
                </DataProvider>
            );
            const loadingElement = await screen.findByText('is loading: false');
            expect(loadingElement).toBeInTheDocument();
        });
    });

    describe('itineraries', () => {
        it('should be instantiated', async () => {
            render(
                <DataProvider>
                    <TestComponent />
                </DataProvider>
            );
            const itinerariesElement = await screen.findByText('itineraries exist: false');
            expect(itinerariesElement).toBeInTheDocument();
        });
    })

    describe('setInProgress()', () => {
        it('should set loading', async () => {
            render(
                <DataProvider>
                    <TestComponent />
                </DataProvider>
            );

            expect(screen.getByText('is loading: false')).toBeInTheDocument();
            const setInProgressButton = screen.getByText('setInProgress');
            user.click(setInProgressButton);
            await new Promise(process.nextTick);

            expect(screen.getByText('is loading: true')).toBeInTheDocument();
        });
    });

    describe('setFetchedData()', () => {
        it('should set loading', async () => {
            render(
                <DataProvider>
                    <TestComponent />
                </DataProvider>
            );

            expect(screen.getByText('itineraries exist: false')).toBeInTheDocument();
            const setFetchedDataButton = screen.getByText('setFetchedData');
            user.click(setFetchedDataButton);
            await new Promise(process.nextTick);
            expect(screen.getByText('itineraries exist: true')).toBeInTheDocument();
        });
    });
})

function createItinerary(): Itinerary {
    const mockSegment: Segment = {
        duration: '4H',
        departure: {
            at: 'mockAt',
            iataCode: 'mockIataCode'
        },
        arrival: {
            at: 'mockArrivalAt',
            iataCode: 'mockIataCode'
        },
        carrierCode: 'mockCarrierCode'
    };

    const mockSegmentTwo: Segment = {
        duration: '5H',
        departure: {
            at: 'mockAtTwo',
            iataCode: 'mockIataCodeTwo'
        },
        arrival: {
            at: 'mockArrivalAtTwo',
            iataCode: 'mockIataCodeTwo'
        },
        carrierCode: 'mockCarrierCodeTwo'
    }
    const flightLeg: FlightLeg = {
        duration: '9H',
        from: 'London',
        to: 'San Francisco',
        numberOfStopovers: 1,
        segments: [mockSegment, mockSegmentTwo]
    };
    return {
        cost: '9000',
        flightLegs: [flightLeg]
    };
}