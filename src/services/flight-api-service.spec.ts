import { FlightApiService, IFlightApiService } from "./flight-api-service";

global.fetch = jest.fn().mockResolvedValue(undefined);


describe('FlightApiService', () => {
    const mockEndpoint = 'mock-endpoint';
    const mockBody = { 
        mockVal: 'mock-val'
    };
    const mockMethod = 'POST'

    beforeEach(() => {

    })

    describe('request()', () => {
        it('should make a request to the given endpoint', () => {
            const mockRequestOptions: RequestInit = {
                method: mockMethod,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mockBody)
            }
            const testInstance = createTestInstance();

            testInstance.request(mockEndpoint, mockBody, mockMethod);

            expect(fetch).toHaveBeenCalledWith(`http://localhost:3001${mockEndpoint}`, mockRequestOptions);
        });

        it('should default to GET if no endpoint is given', () => {
            const mockRequestOptions: RequestInit = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mockBody)
            }
            const testInstance = createTestInstance();

            testInstance.request(mockEndpoint, mockBody);

            expect(fetch).toHaveBeenCalledWith(`http://localhost:3001${mockEndpoint}`, mockRequestOptions);
        })
    })

    function createTestInstance(): IFlightApiService {
        return new FlightApiService();
    }
})