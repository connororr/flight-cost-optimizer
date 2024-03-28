import { Flight } from "../constants/frontend/request/flight";
import { FlightService } from "./flight-service";

describe('FlightService', () => {

   let flights: Array<Flight>;
   let firstFlight: Flight;
   let secondFlight: Flight;
   beforeEach(() => {
      firstFlight =  = {
         id:1,
         from: "NYC",
         to: "LON",
         date: "2024-02-12"
      };
      secondFlight = {
         id: 2,
         from: "LON",
         to: "MAD",
         date: "2024-02-13"}
      flights = [firstFlight, secondFlight];
   })

   describe('getFlightPrices()', () => {
    // should include the hardcoded value check for dateDepartureTimeRange.time
    // and travellers, and sources
    it('should make a request to amadeus', () => {
      const flightService = new FlightService();

      flightService.getFlightPrices(flights);
    });
   })
})