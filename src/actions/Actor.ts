import { Locator, Page as PlaywrightPage } from '@playwright/test';
import { AbstractPage } from 'src/elements/abstract.page.js';
import { TodoPage } from 'src/elements/todo.page.js';

export class Actor {
    protected readonly page: PlaywrightPage;
    currentPage: AbstractPage | undefined;
    
    constructor(page: PlaywrightPage) {
        this.page = page;
    }

    async visits(page: AbstractPage) {
        await this.page.goto(page.url)
        this.currentPage = page
    }

    
    async clicks(locator: Locator) {
        await locator.click()
    }

    async types(locator: Locator, content: string) {
        await locator.fill(content)
    }

    async presses(locator: Locator, key: string) {
        await locator.press(key)
    }

    async checks(locator: Locator) {
        await locator.check()
    }

    onTodo = {   
        addsItem: async(content: string) => {
            const page = this.currentPage as TodoPage
            await this.clicks(page.locators.inputTodo);
            await this.types(page.locators.inputTodo, content);
            await this.presses(page.locators.inputTodo, "Enter");
        },
        checksItem: async(content: string) => {
            const page = this.currentPage as TodoPage
            const item = page.locators.todoItem(content)
            await this.checks(page.locators.todoItemCheckbox(item))
        },
        clearsCompleted: async() => {
            const page = this.currentPage as TodoPage
            await this.clicks(page.locators.clearCompletedBtn)
        }
    }
}