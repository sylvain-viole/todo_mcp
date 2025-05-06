import { test, expect } from '@playwright/test';
import { Actor } from 'src/actions/Actor.js';
import { TodoPage } from 'src/elements/todo.page.js';

test('test', async ({ page }) => {

  const todoPage = new TodoPage(page)
  const actor = new Actor(page)

  await actor.visits(todoPage);
  await expect(todoPage.locators.headerTodos).toBeVisible();
  
  await actor.onTodo.addsItem("YOUPI")
  await expect(todoPage.locators.todoItem("YOUPI")).toBeVisible();

  await actor.onTodo.addsItem("GALETTE")
  await expect(todoPage.locators.todoItem("GALETTE")).toBeVisible();
  
  await actor.onTodo.checksItem("YOUPI");
  await expect(todoPage.locators.todoItem("YOUPI")).toHaveClass("completed");
  await expect(todoPage.locators.todoItem("GALETTE")).not.toHaveClass("completed");

  await actor.onTodo.clearsCompleted();
  await expect(todoPage.locators.todoItem("YOUPI")).not.toBeVisible();
  await expect(todoPage.locators.todoItem("GALETTE")).toBeVisible();

});