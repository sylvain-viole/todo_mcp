import { Page as PlaywrightPage } from '@playwright/test';

export abstract class AbstractPage {
    protected readonly page: PlaywrightPage;

    constructor(page: PlaywrightPage) {
        this.page = page;
    }

    url: string = ""

    async visit(): Promise<void> {
        await this.page.goto(this.url);
    }
}