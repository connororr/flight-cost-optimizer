import { Page, test, expect } from "@playwright/test";
import { getFutureDate } from "../utils";

export interface IMainPage {
    goto(): Promise<void>;
    searchForFlights(fromOne: string, toOne: string, fromTwo: string, toTwo: string): Promise<void>;
    expectFlightResults(flightResult: string, stopover: string): Promise<void>;
}

export class MainPage implements IMainPage {
    constructor(private readonly page: Page) {}


    // TODO [CO]: should use helper methods in the future
    public async goto() {
        await this.page.goto('https://exploria-test.xyz/');
    }

    @boxedStep
    public async searchForFlights(
        fromOne: string,
        toOne: string,
        fromTwo: string,
        toTwo: string
    ) {
        await this.page.locator('#from1').fill(fromOne);
        await this.page.locator('#from2').fill(fromTwo);
        await this.page.locator('#date1').fill(getFutureDate(2));
        await this.page.locator('#to1').fill(toOne);
        await this.page.locator('#to2').fill(toTwo);
        await this.page.locator('#date2').fill(getFutureDate(4));
        await this.page.getByText('Search Flights').click();
    }

    @boxedStep
    public async expectFlightResults(flightResult: string, stopover: string) {
        await expect(this.page.getByText(flightResult).first()).toBeVisible({ timeout: 10000 });
        await expect(this.page.getByText(stopover).first()).toBeVisible({ timeout: 10000 });
    }

}

function boxedStep(target: Function, context: ClassMethodDecoratorContext) {
    return function replacementMethod(...args: any) {
        const name = this.constructor.name + '.' + (context.name as string);
        return test.step(name, async () => {
            return await target.call(this, ...args);
        }, { box: true });  // Note the "box" option here.
    };
}