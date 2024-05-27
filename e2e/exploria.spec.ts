import { test } from '@playwright/test';
import { MainPage } from './page-objects';

test.describe('Flight Input Scenarios', () => {
    test.beforeEach(async ({ page }) => {
        const pom = new MainPage(page);
        await pom.goto();
    });

    test('search for roundtrip flights', async ({ page }) => {
        const pom = new MainPage(page);
        await pom.searchForFlights('Paris', 'London', 'Paris', 'London');
        await pom.expectFlightResults('CDG - LHR', 'Direct');
    });

    test('Show a valid error message', async ({ page }) => {
        const pom = new MainPage(page);
        await pom.searchForFlights('', '', '', '');
        await pom.expectErrorMessage(4);
    });
});
