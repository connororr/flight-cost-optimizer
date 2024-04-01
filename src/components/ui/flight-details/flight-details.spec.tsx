import {FlightLeg, Itinerary, Segment} from "@/constants/response";
import {render, screen} from "@testing-library/react";
import FlightDetails from "@/components/ui/flight-details/flight-details";


describe('FlightDetails', () => {
    const mockSegmentOne: Segment = createMockSegmentOne();
    const mockSegmentTwo: Segment = createMockSegmentTwo();

    it('should display direct if there are no stopovers', () => {
        const mockItinerary = createDirectItinerary();
        render(<FlightDetails itinerary={mockItinerary} />);

        const flightLegs = screen.getAllByTestId('flight-leg');
        expect(flightLegs[0]).toHaveTextContent('Direct');
    });

    it('should display the number of stopovers if there are more than one stopover', () => {
        const mockItinerary = createItineraryWithStopovers();
        render(<FlightDetails itinerary={mockItinerary} />);

        const flightLegs = screen.getAllByTestId('flight-leg');
        expect(flightLegs[0]).toHaveTextContent('1 stop');
    });

    it('should display all the stopover locations', () => {
        const mockItinerary = createItineraryWithStopovers();
        render(<FlightDetails itinerary={mockItinerary} />);

        const flightLegs = screen.getAllByTestId('flight-leg');
        expect(flightLegs[0]).toHaveTextContent('CDG');
    });

    function createDirectItinerary(): Itinerary {

        const flightLeg: FlightLeg = {
            duration: '4H',
            from: 'London',
            to: 'San Francisco',
            numberOfStopovers: 0,
            segments: [mockSegmentOne]
        };
        return {
            cost: '9000',
            flightLegs: [flightLeg]
        };
    }
    function createItineraryWithStopovers(): Itinerary {
        const flightLeg: FlightLeg = {
            duration: '9H',
            from: 'London',
            to: 'San Francisco',
            numberOfStopovers: 1,
            segments: [mockSegmentOne, mockSegmentTwo]
        };
        return {
            cost: '9000',
            flightLegs: [flightLeg]
        };
    }

    function createMockSegmentOne() {
        return {
            duration: '4H',
            departure: {
                at: 'mockAt',
                iataCode: 'MAD'
            },
            arrival: {
                at: 'mockArrivalAt',
                iataCode: 'CDG'
            },
            carrierCode: 'mockCarrierCode'
        };
    }

    function createMockSegmentTwo() {
        return {
            duration: '5H',
            departure: {
                at: 'mockAtTwo',
                iataCode: 'CDG'
            },
            arrival: {
                at: 'mockArrivalAtTwo',
                iataCode: 'NYC'
            },
            carrierCode: 'mockCarrierCodeTwo'
        };
    }
})