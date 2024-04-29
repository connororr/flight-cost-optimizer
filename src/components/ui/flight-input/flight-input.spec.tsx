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

jest.mock('@/context/ApiServiceContext', () => ({
    useApiService: () => ({
        flightApiService: {}
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
    });

    it('should search for flights given a set of travel details', async () => {
        const { result, rerender } = renderHook(() => useFlightInputs());

        act(() => {
            result.current.setRows(mockRows);
        })
        rerender();
        await result.current.getFlightPrices();

        expect(mockFlightPriceService.getFlightPrices).toHaveBeenCalledWith(mockRows);
    });

    it.each([['from', 'Please enter a valid departure location.'],
        ['to', 'Please enter a valid arrival location.'],
        ['date', 'Please enter a valid departure date.']])('should show an error when a \'%s\' input field is not filled in',
        async (_, expectedMessage) => {
            const mockErrorRows = createMockRows(true);
            const { result, rerender } = renderHook(() => useFlightInputs());

            act(() => {
                result.current.setRows(mockErrorRows);
            })
            rerender();
            await act(async () => {
                await result.current.getFlightPrices();
            })
            rerender();
            const errorMessageExists = result.current.errorMessages.includes(expectedMessage);
            expect(errorMessageExists).toBe(true);
    });


    it('should show an error when calendar dates are not in chronological order', async() => {
        const mockErrorRows = createMockRowsInWrongChronologicalOrder();
        const { result, rerender } = renderHook(() => useFlightInputs());

        act(() => {
            result.current.setRows(mockErrorRows);
        })
        rerender();
        await act(async () => {
            await result.current.getFlightPrices();
        })
        rerender();
        const errorMessageExists = result.current.errorMessages.includes('Please ensure your dates are in chronological order.');
        expect(errorMessageExists).toBe(true);
    });

    it('should throw an error if dates earlier than today are used', async () => {
        const mockErrorRows = createMockRowsInWrongChronologicalOrder('2020-03-03');
        const { result, rerender } = renderHook(() => useFlightInputs());

        act(() => {
            result.current.setRows(mockErrorRows);
        })
        rerender();
        await act(async () => {
            await result.current.getFlightPrices();
        })
        rerender();
        const errorMessageExists = result.current.errorMessages.includes('Please ensure your dates are not in the past.');
        expect(errorMessageExists).toBe(true);
    });

    it('should report an error if an error is encountered when making a call to the backend', async() => {
        mockFlightPriceService = {
            getFlightPrices: jest.fn().mockRejectedValue(new Error('mock error'))
        };
        (FlightPriceService as jest.Mock).mockReturnValue(mockFlightPriceService);
        const { result, rerender } = renderHook(() => useFlightInputs());

        act(() => {
            result.current.setRows(mockRows);
        })
        rerender();
        await act(async () => {
            await result.current.getFlightPrices();
        })
        rerender();

        const errorMessageExists = result.current.errorMessages.includes(
            'Error encountered when attempting to fetch relevant flight details. Please try again.'
        );
        expect(errorMessageExists).toBe(false);
    })

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
            });
        })
    })

    function createMockRows(isError: boolean = false): Array<IRow> {
        const mockRow1: IRow = {
            id: 123,
            from: isError? '' : 'mock-from',
            to: isError ? '' : 'mock-to',
            date: isError ? '' : '2025-02-03'
        };
        const mockRow2: IRow = {
            id: 456,
            from: 'mock-from-2',
            to: 'mock-to-2',
            date: '2025-03-09'
        }
        return [mockRow1, mockRow2];
    };

    function createMockRowsInWrongChronologicalOrder(dateOverride?: string) {
        const mockRow1 = createMockRow('mockFrom', 'mockTo', dateOverride ?? '2028-04-08');
        const mockRow2 = createMockRow('mockFrom', 'mockTo', '2028-04-06');
        return [mockRow1, mockRow2]
    }

    function createMockRow(mockFrom?: string, mockTo?: string, mockDate?: string): IRow {
       return {
            id: 123,
            from:  mockFrom ?? 'mock-from',
            to: mockTo ?? 'mock-to',
            date: mockDate ?? 'mock-date'
        };
    }
})