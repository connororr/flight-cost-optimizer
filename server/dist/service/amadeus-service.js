var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from 'node-fetch';
export class AmadeusService {
    constructor() {
        this.accessTokenTimestamp = 0;
        this.accessToken = '';
        this.amadeusBaseUrl = 'https://test.api.amadeus.com';
    }
    request(endpoint, body, method = 'GET') {
        return __awaiter(this, void 0, void 0, function* () {
            const elapsedTime = (Date.now() - this.accessTokenTimestamp) / (1000 * 60);
            if (elapsedTime > 20) {
                this.accessToken = yield this.getAccessToken();
            }
            // TODO: figure out the right type
            const requestOptions = {
                method,
                headers: this.generateDefaultHeaders(method),
                body: JSON.stringify(body)
            };
            return fetch(`${this.amadeusBaseUrl}${endpoint}`, requestOptions);
        });
    }
    generateDefaultHeaders(method) {
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.accessToken}`
        };
        if (method === 'POST') {
            headers['X-HTTP-Method-Override'] = 'POST';
        }
        return headers;
    }
    getAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenRequest = {
                grant_type: 'client_credentials',
                client_id: process.env.REACT_APP_api_key,
                client_secret: process.env.REACT_APP_api_secret,
            };
            // TODO: figure out the right type
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(tokenRequest).toString(),
            };
            const tokenResponse = yield fetch(`${this.amadeusBaseUrl}/v1/security/oauth2/token`, requestOptions);
            const responseBody = yield tokenResponse.json();
            this.accessTokenTimestamp = Date.now();
            return responseBody.access_token;
        });
    }
}
