var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Endpoints } from "../constants/endpoints";
import { AmadeusService } from "./amadeus-service";
export class FlightService {
    constructor() {
        this.amadeusService = new AmadeusService();
    }
    getFlightPrices(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const originDestinations = options.map((flight) => ({
                id: String(flight.id),
                originLocationCode: flight.from,
                destinationLocationCode: flight.to,
                departureDateTimeRange: {
                    date: flight.date
                }
            }));
            // TODO: remove hardcoded value and replace with input from a button
            const travelers = [{ id: '1', travelerType: 'ADULT' }];
            const sources = ['GDS'];
            const body = {
                originDestinations,
                travelers,
                sources
            };
            const response = yield this.amadeusService.request(Endpoints.FlightPrice, body, 'POST');
            // TODO: transform the response into the desired return type for the cards that you need
            return 'blah';
        });
    }
}
