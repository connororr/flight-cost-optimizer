
export interface IFlightApiService {
    request(url: string, body: unknown, method: HTTPMethod): Promise<unknown>;
}

type HTTPMethod = 'POST' | 'GET'

export class FlightApiService implements IFlightApiService {
    // TODO: update this with the prod url when you get the prod url
    private flightApiServiceBaseUrl: string = 'http://localhost:3001';

    public request(endpoint: string, body: unknown, method: HTTPMethod = 'GET'): Promise<unknown> {
        
        const requestOptions: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }
        return fetch(`${this.flightApiServiceBaseUrl}${endpoint}`, requestOptions)
    }
}