import { test } from '@playwright/test';
import { MainPage } from './page-objects';

test.describe('Flight Input Scenarios', () => {
    test.beforeEach(async ({ page }) => {
        const pom = new MainPage(page);
        await pom.goto();
    });

    test('search for roundtrip flights', async ({ page }) => {
        const pom = new MainPage(page);
        await pom.searchForFlights('MAD', 'LON', 'LON', 'MAD');
        await pom.expectFlightResults('MAD - LHR', 'Direct');
    });

    test('get IATA code', async ({ page }) => {
        const pom = new MainPage(page);
        await pom.searchForIataCode('New York');
        await pom.expectIataCode('JFK');
    });

    test('Show a valid error message', async ({ page }) => {
        const pom = new MainPage(page);
        await pom.searchForFlights('', '', '', '');
        await pom.expectErrorMessage(4);
    });
});
