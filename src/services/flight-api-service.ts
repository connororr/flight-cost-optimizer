import { config } from '@/constants/urls';

export interface IFlightApiService {
    get(endpoint: string, params?: URLSearchParams): Promise<unknown>;
    post(endpoint: string, body?: unknown): Promise<unknown>;
}

export class FlightApiService implements IFlightApiService {
    private _flightApiServiceBaseUrl: string = config.url;

    public post(endpoint: string, body?: unknown): Promise<unknown> {
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        return fetch(
            `${this._flightApiServiceBaseUrl}${endpoint}`,
            requestOptions
        );
    }

    public get(endpoint: string, params?: URLSearchParams): Promise<unknown> {
        const requestOptions: RequestInit = {
            method: 'GET',
            headers: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                'Content-Type': 'application/json',
            },
        };

        const baseUrl = `${this._flightApiServiceBaseUrl}${endpoint}`;
        const url = params ? `${baseUrl}?${params}` : `${baseUrl}`;
        return fetch(url, requestOptions);
    }
}
