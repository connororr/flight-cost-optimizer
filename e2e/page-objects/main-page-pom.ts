import { Page, test, expect } from '@playwright/test';
import { getFutureDate } from '../utils';

export interface IMainPage {
    goto(): Promise<void>;
    searchForFlights(
        fromOne: string,
        toOne: string,
        fromTwo: string,
        toTwo: string
    ): Promise<void>;
    searchForIataCode(input: string): Promise<void>;
    expectIataCode(code: string): Promise<void>;
    expectFlightResults(flightResult: string, stopover: string): Promise<void>;
    expectErrorMessage(errorMessageCount: number): Promise<void>;
}

export class MainPage implements IMainPage {
    constructor(private readonly _page: Page) {}

    public async goto() {
        await this._page.goto('https://exploria-test.xyz/');
    }

    @boxedStep
    public async searchForFlights(
        fromOne: string,
        toOne: string,
        fromTwo: string,
        toTwo: string
    ) {
        await this._page.locator('#from1').fill(fromOne);
        await this._page.locator('#from2').fill(fromTwo);
        await this._page.locator('#date1').fill(getFutureDate(2));
        await this._page.locator('#to1').fill(toOne);
        await this._page.locator('#to2').fill(toTwo);
        await this._page.locator('#date2').fill(getFutureDate(4));
        await this._page.getByText('Search Flights').click();
    }

    @boxedStep
    public async searchForIataCode(input: string) {
        await this._page.getByPlaceholder('City name').fill(input);
        await this._page.getByText('Get Code!').click();
    }

    @boxedStep
    public async expectIataCode(code: string) {
        await expect(this._page.getByText(code)).toBeVisible({ timeout: 10000 });
    }

    @boxedStep
    public async expectFlightResults(flightResult: string, stopover: string) {
        await expect(this._page.getByText(flightResult).first()).toBeVisible({
            timeout: 10000,
        });
        await expect(this._page.getByText(stopover).first()).toBeVisible({
            timeout: 10000,
        });
    }

    @boxedStep
    public async expectErrorMessage(errorMessageCount: number) {
        const errrorLocators = await this._page.getByText('Error').all();
        for (const locator of errrorLocators) {
            await expect(locator).toBeVisible({ timeout: 10000 });
        }
        expect(errrorLocators.length).toBe(errorMessageCount);
    }
}

function boxedStep(target: Function, context: ClassMethodDecoratorContext) {
    return function replacementMethod(...args: any) {
        const name = this.constructor.name + '.' + (context.name as string);
        return test.step(
            name,
            async () => {
                return await target.call(this, ...args);
            },
            { box: true }
        ); // Note the "box" option here.
    };
}
