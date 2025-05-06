import { expect } from "@playwright/test";
import { mcpExecutionContext } from "../executionContext.js";
import { MpcTools } from "../ToolsInterface.js";
import { TodoPage } from "../../elements/todo.page.js";

const assertTodoItemVisible: MpcTools = {
    list: {

        name: "assert_item_visible",
        description: "Test a todo item is visible",
        inputSchema: {
            type: "object",
            properties: {
                itemName: { type: "string" }
            }
        },
        required: ["itemName"],
    },
    call: async (itemName: string) => {
        try {
            await expect((mcpExecutionContext.actor?.currentPage as TodoPage).locators.todoItem(itemName), "NOT VISIBLE").toBeVisible()
        } catch (error) {
            console.log((error as Error).message)
            return {
                content: [{ type: "text", text: (error as Error).message }]
            }
        }
        return {
            content: [{ type: "text", text: `Asserted ${itemName} todo` }]
        }
    }
}

const assertTodoItemCheckedStatus: MpcTools = {
    list: {

        name: "assert_item_checked_status",
        description: "Test a todo item checked status",
        inputSchema: {
            type: "object",
            properties: {
                itemName: { type: "string" },
                status: { type: "boolean" }
            }
        },
        required: ["itemName", "status"],
    },
    call: async (params: { itemName: string, status: boolean }) => {
        try {
            switch (params.status) {
                case true:
                    await expect((mcpExecutionContext.actor?.currentPage as TodoPage).locators.todoItem(params.itemName)).toHaveClass("completed");
                    break;
                case false:
                    await expect((mcpExecutionContext.actor?.currentPage as TodoPage).locators.todoItem(params.itemName)).not.toHaveClass("completed");
                    break;
            }
        } catch (error) {
            return {
                content: [{ type: "text", text: (error as Error).message }]
            }
        }
        return {
            content: [{ type: "text", text: `Asserted ${params.itemName} todo check status is ${params.status}` }]
        }
    }
}

export { assertTodoItemVisible, assertTodoItemCheckedStatus }