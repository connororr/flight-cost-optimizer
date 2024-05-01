import { Page, test } from "@playwright/test";
import { getFutureDate } from "../utils";

export class MainPage {
    constructor(private readonly page: Page) {}


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
        this.page.locator('from1').fill(fromOne);
        this.page.locator('from2').fill(fromTwo);
        this.page.locator('date1').fill(getFutureDate(2));
        this.page.locator('to1').fill(toOne);
        this.page.locator('to2').fill(toTwo);
        this.page.locator('date2').fill(getFutureDate(4));
        this.page.getByText('Search Flights');
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