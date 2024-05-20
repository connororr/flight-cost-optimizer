import { Endpoints } from '@/constants/endpoints';
import { IFlightApiService } from '@/services/flight-api-service';

interface City {
    iataCode: string;
    name: string;
}

export interface IIataCodeService {
    getIataCodes(input: string): Promise<Array<City>>;
}

export class IataCodeService implements IIataCodeService {
    constructor(private _flightApiService: IFlightApiService) {}
    public async getIataCodes(input: string): Promise<Array<City>> {
        const searchParam = new URLSearchParams({
            search: input,
        });
        const response: any = await this._flightApiService.get(
            Endpoints.IATACodes,
            searchParam
        );
        return (await response.json()) as Array<City>;
    }
}
