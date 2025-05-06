
import { Actor } from 'src/actions/Actor.js';
import { TodoPage } from 'src/elements/todo.page.js';
import { todoSpecDataset } from './todo.data.js';
import { test, expect } from '@playwright/test';

test('As a user I can interact with the todo list', async ({ page }) => {

  const data = todoSpecDataset
  const actor = new Actor(page)
  const todoPage = new TodoPage(page)

  await test.step(`I can access the todo page`, async () => {
    await actor.visits(todoPage);
    await expect(todoPage.locators.headerTodos).toBeVisible();
  })

  for (const item of [data.checked, data.notChecked]) {
    await test.step(`I can add item ${item}`, async () => {
      await actor.onTodo.addsItem(item)
      await expect(todoPage.locators.todoItem(item)).toBeVisible();
    })
  }

  await test.step(`I can check item ${data.checked}`, async () => {
    await actor.onTodo.checksItem(data.checked);
    await expect(todoPage.locators.todoItem(data.checked)).toHaveClass("completed");
    await expect(todoPage.locators.todoItem(data.notChecked)).not.toHaveClass("completed");
  })

  await test.step(`I can complete item ${data.checked}`, async () => {
    await actor.onTodo.clearsCompleted();
    await expect(todoPage.locators.todoItem(data.checked)).not.toBeVisible();
    await expect(todoPage.locators.todoItem(data.notChecked)).toBeVisible();
  })
});