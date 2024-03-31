import { render, renderHook, screen, act } from "@testing-library/react";
import FlightInput, {IRow, useFlightInputs} from './flight-input';
import { FlightPriceService, IFlightPriceService } from "@/services/flight-price-service";
import user from "@testing-library/user-event";

jest.mock('@/services/flight-price-service');
jest.mock('@/context/DataContext', () => ({
    useData: () => ({
        loading: false,
        setFetchedData: jest.fn(),
        setInProgress: jest.fn(),
    }),
}));
describe('FlightInput', () => {

    const mockRows = createMockRows();
    let mockFlightPriceService: jest.Mocked<IFlightPriceService>;

    beforeEach(() => {
        mockFlightPriceService = {
            getFlightPrices: jest.fn()
        };
        (FlightPriceService as jest.Mock).mockReturnValue(mockFlightPriceService);
    })

    it('should search for flights given a set of travel details', async () => {
        const { result, rerender } = renderHook(() => useFlightInputs());

        result.current.setRows(mockRows);
        rerender();
        result.current.getFlightPrices();
        await new Promise(process.nextTick);

        expect(mockFlightPriceService.getFlightPrices).toHaveBeenCalledWith(mockRows);
    });

    describe('when six rows are being displayed', () => {
        it('should not allow you to display any more rows by removing the add row button from the DOM', async () => {
            render(<FlightInput />);

            const addRowButton = await screen.findByText('Add another row');
            act(() => {
                Array.from({ length: 4 }).map(_ => {
                    user.click(addRowButton);
                });
            });
            expect(addRowButton).not.toBeInTheDocument();
        });
    });

    describe('when only two rows are being displayed', () => {
        it('should not allow you to delete rows', async () => {
            render(<FlightInput />);
            const removeRowButtons = await screen.findAllByLabelText('remove row');

            removeRowButtons.forEach((removeRowButton) => {
                expect(removeRowButton).toBeDisabled();
            })
        })
    })

    function createMockRows(): Array<IRow> {
        const mockRow1: IRow = {
            id: 123,
            from: 'mock-from',
            to: 'mock-to',
            date: 'mock-date'
        };
        const mockRow2: IRow = {
            id: 456,
            from: 'mock-from-2',
            to: 'mock-to-2',
            date: 'mock-date-2'
        }
        return [mockRow1, mockRow2];
    }
})