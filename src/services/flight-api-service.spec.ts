import { FlightApiService, IFlightApiService } from './flight-api-service';

global.fetch = jest.fn().mockResolvedValue(undefined);

describe('FlightApiService', () => {
    const mockEndpoint = '/mock-endpoint';
    const mockBody = {
        mockVal: 'mock-val',
    };
    const mockPostMethod = 'POST';
    const mockGetMethod = 'GET';

    beforeEach(() => {});

    describe('post()', () => {
        it('should make a request to the given endpoint', () => {
            const mockRequestOptions: RequestInit = {
                method: mockPostMethod,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mockBody),
            };
            const testInstance = createTestInstance();

            testInstance.post(mockEndpoint, mockBody);

            expect(fetch).toHaveBeenCalledWith(
                `http://localhost:3001${mockEndpoint}`,
                mockRequestOptions
            );
        });
    });

    describe('get()', () => {
        it('should make a request to the given endpoint', () => {
            const mockRequestOptions: RequestInit = {
                method: mockGetMethod,
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const testInstance = createTestInstance();

            testInstance.get(mockEndpoint);

            expect(fetch).toHaveBeenCalledWith(
                `http://localhost:3001${mockEndpoint}`,
                mockRequestOptions
            );
        });

        it('should add params to the url if given', () => {
            const mockSearchParams = new URLSearchParams({
                mockVal: 'mockVal',
            });
            const mockRequestOptions: RequestInit = {
                method: mockGetMethod,
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const testInstance = createTestInstance();

            testInstance.get(mockEndpoint, mockSearchParams);

            expect(fetch).toHaveBeenCalledWith(
                `http://localhost:3001${mockEndpoint}?${mockSearchParams}`,
                mockRequestOptions
            );
        });
    });

    function createTestInstance(): IFlightApiService {
        return new FlightApiService();
    }
});
