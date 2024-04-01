import { AmadeusService } from "./amadeus-service.ts";

global.fetch = jest.fn().mockResolvedValue({
    json: {
        access_token: 'mock-access-token'
    }
});

describe('AmadeusService', () => {

    const mockEndpoint = 'mock-endpoint';
    const mockBody = { mockVal: 'mockVal' };
    const mockHttpMethod = 'POST';

    it('should grab an access token if it doesn\'t exist', async () => {
        const testInstance = createTestInstance();
        const tokenRequest = {
            grant_type: 'client_credentials',
            client_id: 'mock-client-id',
            client_secret: 'mock-client-secret',
        };

        const mockRequestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(tokenRequest).toString(),
        };

        await testInstance.request(mockEndpoint, mockBody, mockHttpMethod);

        expect(fetch).toHaveBeenCalledWith('https://test.api.amadeus.com/v1/security/oauth2/token', mockRequestOptions);
    });
    // it('should grab an access token if it has expired after 20 minutes')
    // it('should make a request to amadeus with the correct body, endpoint and headers')

    function createTestInstance() {
        return new AmadeusService();
    }
})