import fetch from 'node-fetch';
import { AccessTokenResponse } from '../constants/external-api/response';
import 'dotenv/config'



export interface IAmadeusService {
    request(url: string, body: unknown, method: 'POST' | 'GET'): Promise<unknown>;
}

type HTTPMethod = 'POST' | 'GET'

export class AmadeusService implements IAmadeusService {

    private accessTokenTimestamp: number = 0;
    private accessToken: string = '';
    private amadeusBaseUrl: string = 'https://test.api.amadeus.com';

    public async request(endpoint: string, body: unknown, method: HTTPMethod = 'GET'): Promise<unknown> {
        const elapsedTime = (Date.now() - this.accessTokenTimestamp) / (1000 * 60);
        if (elapsedTime > 20) {
            this.accessToken = await this.getAccessToken();
        }
        
        // TODO: figure out the right type
        const requestOptions = {
            method,
            headers: this.generateDefaultHeaders(method),
            body: JSON.stringify(body)
        }
        return fetch(`${this.amadeusBaseUrl}${endpoint}`, requestOptions)
    }

    private generateDefaultHeaders(method: HTTPMethod): HeadersInit {
        let headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.accessToken}`
        };

        if (method === 'POST') {
            headers['X-HTTP-Method-Override'] = 'POST' 
        }

        return headers;
    }
    private async getAccessToken(): Promise<string> {

        // TODO: move these secret values to a secrets manager
        const tokenRequest = {
            grant_type: 'client_credentials',
            client_id: process.env.client_id!,
            client_secret: process.env.client_secret!,
        };

        // TODO: figure out the right type
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(tokenRequest).toString(),
        };
        const tokenResponse = await fetch(`${this.amadeusBaseUrl}/v1/security/oauth2/token`, requestOptions);
        const responseBody: AccessTokenResponse = await tokenResponse.json() as AccessTokenResponse;
        this.accessTokenTimestamp = Date.now();
        return responseBody.access_token;
    }
}