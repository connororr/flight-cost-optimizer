import { Flight } from "../../server/src/constants/frontend/request/flight";
import { IFlightApiService } from "./flight-api-service";
import { Endpoints } from "@/constants/endpoints";
import { FlightPriceService } from "@/services/flight-price-service";
import {Itineraries} from "@/constants/response";
describe('FlightPriceService', () => {
    let mockFlight: Flight;
    let mockFlights: Array<Flight>;
    let mockFlightApiService: jest.Mocked<IFlightApiService>;
    let mockItineraries: Array<Itineraries>;

    beforeEach(() => {
        mockItineraries = [];
        mockFlight = {
            id: 123,
            from: 'mockFrom',
            to: 'mockTo',
            date: 'mockDate'
        }
        mockFlights = [mockFlight];
        mockFlightApiService = {
            post: jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue(mockItineraries)
            })
        };
    })

    describe('getFlightPrices()', () => {
        it('should make a request to get flight prices', async () => {
            const testInstance = createTestInstance();
            const mockBody = JSON.stringify(mockFlights);
            await testInstance.getFlightPrices(mockFlights);
            expect(mockFlightApiService.post).toHaveBeenCalledWith(Endpoints.Flights, mockBody)
        });
    })

    function createTestInstance() {
        return new FlightPriceService(mockFlightApiService);
    }
})