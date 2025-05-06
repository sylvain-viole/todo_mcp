import { expect } from "@playwright/test";
import { mcpExecutionContext } from "../executionContext.js";
import { MpcTools } from "../ToolsInterface.js";
import { TodoPage } from "../../elements/todo.page.js";

export const assertLocatorVisible: MpcTools = {
    list: {

        name: "assert_locator_visible",
        description: "Test a locator is visible",
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
            await expect((mcpExecutionContext.actor?.currentPage as TodoPage).locators.todoItem(itemName),"NOT VISIBLE").toBeVisible()
        } catch(error) {
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
