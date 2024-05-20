import { Row as Flight } from '@/components/ui/flight-input/flight-input';
import { Endpoints } from '@/constants/endpoints';
import { IFlightApiService } from './flight-api-service';
import { Itineraries } from '@/constants/response';

export interface IFlightPriceService {
    getFlightPrices(options: Array<Flight>): Promise<Itineraries>;
}

export class FlightPriceService implements IFlightPriceService {
    constructor(private _flightApiService: IFlightApiService) {}

    public async getFlightPrices(options: Array<Flight>): Promise<Itineraries> {
        const body = JSON.stringify(options);
        const response: any = await this._flightApiService.post(
            Endpoints.Flights,
            body
        );
        const responseJson = await response.json();
        return responseJson as Itineraries;
    }
}
