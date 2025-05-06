import { test, expect } from '@playwright/test';
import { Actor } from 'src/actions/Actor.js';
import { TodoPage } from 'src/elements/todo.page.js';
import { todoSpecDataset } from './todo.data.js';

test('test', async ({ page }) => {

  const data = todoSpecDataset
  const actor = new Actor(page)
  const todoPage = new TodoPage(page)

  await actor.visits(todoPage);
  await expect(todoPage.locators.headerTodos).toBeVisible();
  
  await actor.onTodo.addsItem(data.checked)
  await expect(todoPage.locators.todoItem(data.checked)).toBeVisible();

  await actor.onTodo.addsItem(data.notChecked)
  await expect(todoPage.locators.todoItem(data.notChecked)).toBeVisible();
  
  await actor.onTodo.checksItem(data.checked);
  await expect(todoPage.locators.todoItem(data.checked)).toHaveClass("completed");
  await expect(todoPage.locators.todoItem(data.notChecked)).not.toHaveClass("completed");

  await actor.onTodo.clearsCompleted();
  await expect(todoPage.locators.todoItem(data.checked)).not.toBeVisible();
  await expect(todoPage.locators.todoItem(data.notChecked)).toBeVisible();

});