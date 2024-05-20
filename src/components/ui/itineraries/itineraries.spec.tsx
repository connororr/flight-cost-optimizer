import Itineraries from '@/components/ui/itineraries/itineraries';
import { render, screen } from '@testing-library/react';
import { DataContextValue, useData } from '@/context/DataContext';
import { FlightLeg, Itinerary, Segment } from '@/constants/response';

jest.mock('@/context/DataContext');

describe('itineraries', () => {
    let mockDataContext: DataContextValue;

    beforeEach(() => {
        mockDataContext = {
            itineraries: null,
            loading: false,
            setFetchedData: jest.fn(),
            setInProgress: jest.fn(),
        };
        (useData as jest.Mock).mockReturnValue(mockDataContext);
    });

    describe('whilst loading the results of the flight search', () => {
        it('should display a loading component', async () => {
            const newContext: DataContextValue = {
                ...mockDataContext,
                itineraries: null,
                loading: true,
            };
            (useData as jest.Mock).mockReturnValue(newContext);
            render(<Itineraries />);

            const flightDetailsLoading = await screen.findAllByTestId(
                'flight-details-loading'
            );
            expect(flightDetailsLoading.length).toBe(6);
        });
    });

    it('should display each itinerary', () => {
        const mockItinerary = createItinerary();

        const newContext: DataContextValue = {
            ...mockDataContext,
            itineraries: [mockItinerary],
            loading: false,
        };
        (useData as jest.Mock).mockReturnValue(newContext);
        render(<Itineraries />);
        const flightDetailsComponents = screen.getByTestId('flight-details');
        expect(flightDetailsComponents).toBeDefined();
    });

    function createItinerary(): Itinerary {
        const mockSegment: Segment = {
            duration: '4H',
            departure: {
                at: 'mockAt',
                iataCode: 'mockIataCode',
            },
            arrival: {
                at: 'mockArrivalAt',
                iataCode: 'mockIataCode',
            },
            carrierCode: 'mockCarrierCode',
        };

        const mockSegmentTwo: Segment = {
            duration: '5H',
            departure: {
                at: 'mockAtTwo',
                iataCode: 'mockIataCodeTwo',
            },
            arrival: {
                at: 'mockArrivalAtTwo',
                iataCode: 'mockIataCodeTwo',
            },
            carrierCode: 'mockCarrierCodeTwo',
        };
        const flightLeg: FlightLeg = {
            duration: '9H',
            from: 'London',
            to: 'San Francisco',
            numberOfStopovers: 1,
            segments: [mockSegment, mockSegmentTwo],
        };
        return {
            cost: '9000',
            flightLegs: [flightLeg],
        };
    }
});
