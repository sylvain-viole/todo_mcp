import { mcpExecutionContext } from "../executionContext.js";
import { MpcTools } from "../ToolsInterface.js";

export const todoItemAddTool: MpcTools = {
    list: {

        name: "todo_add",
        description: "Add a todo item to the todo list",
        inputSchema: {
            type: "object",
            properties: {
                itemName: { type: "string" }
            }
        },
        required: ["itemName"],
    },
    call: async (itemName) => {
        await mcpExecutionContext.actor?.onTodo.addsItem(itemName)
        return {
            content: [{ type: "text", text: `Added ${itemName} todo` }]
        }
    }
}

export const todoItemCheckTool: MpcTools = {
    list: {

        name: "todo_check",
        description: "Check a todo item to the todo list",
        inputSchema: {
            type: "object",
            properties: {
                itemName: { type: "string" }
            }
        },
        required: ["itemName"],
    },
    call: async (itemName) => {
        await mcpExecutionContext.actor?.onTodo.checksItem(itemName)
        return {
            content: [{ type: "text", text: `Checked ${itemName} todo` }]
        }
    }
}
