import Itineraries from "@/components/ui/itineraries/itineraries";
import { render, screen } from "@testing-library/react";
import { DataContextValue, useData } from "@/context/DataContext";

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
    })

    describe('whilst loading the results of the flight search', () => {
        it('should display a loading component', async () => {
            const newContext: DataContextValue = {
                ...mockDataContext,
                itineraries: null,
                loading: true,
            };
            (useData as jest.Mock).mockReturnValue(newContext);
            render(<Itineraries />);

            const flightDetailsLoading = await screen.findAllByTestId('flight-details-loading');
            expect(flightDetailsLoading.length).toBe(6);
        });
    });

    it('should display each itinerary', () => {
        const newContext: DataContextValue = {
            ...mockDataContext,
            itineraries: null,
            loading: true,
        };
        (useData as jest.Mock).mockReturnValue(newContext);
    });
})