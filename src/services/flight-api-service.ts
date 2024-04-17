
export interface IFlightApiService {
    get(endpoint: string, params?: URLSearchParams): Promise<unknown>;
    post(endpoint: string, body?: unknown): Promise<unknown>;
}

export class FlightApiService implements IFlightApiService {
    private flightApiServiceBaseUrl: string = 'https://exploria-api.xyz';

    public post(endpoint: string, body?: unknown): Promise<unknown> {
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }
        return fetch(`${this.flightApiServiceBaseUrl}${endpoint}`, requestOptions)
    }

    public get(endpoint: string, params?: URLSearchParams): Promise<unknown> {
        const requestOptions: RequestInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const baseUrl = `${this.flightApiServiceBaseUrl}${endpoint}`;
        const url = params ? `${baseUrl}?${params}` : `${baseUrl}`;
        return fetch(url, requestOptions)
    }
}