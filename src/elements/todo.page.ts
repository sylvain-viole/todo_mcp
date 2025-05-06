import { Locator } from "@playwright/test";
import { AbstractPage } from "./abstract.page.js";

export class TodoPage extends AbstractPage {
    override url = "/todomvc/#/"

    locators = {
        headerTodos: this.page.getByRole('heading', { name: 'todos' }),

        inputTodo: this.page.getByRole('textbox', { name: 'What needs to be done?' }),
        
        todoItem: (content: string) => this.page.getByRole('listitem').filter({hasText: content}),
        
        todoItemCheckbox: (item: Locator) => item.getByLabel('Toggle Todo'),
        
        clearCompletedBtn: this.page.getByRole('button', { name: 'Clear completed' })
    }
}