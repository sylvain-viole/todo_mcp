import { mcpExecutionContext } from "../executionContext.js";
import { MpcTools } from "../ToolsInterface.js";
import { TodoPage } from "../../elements/todo.page.js";

export const pageVisit: MpcTools = {
    list: {

        name: "page_visit",
        description: "Visits a web page with the browser",
        inputSchema: {
            type: "object",
            properties: {
                pageName: { type: "string" }
            }
        },
        required: ["pageName"],
    },
    call: async (pageName: string) => {
        if (mcpExecutionContext.page == undefined) return { content: [{ type: "text", text: `page not init` }] }
        if (mcpExecutionContext.actor == undefined) return { content: [{ type: "text", text: `actor not init` }] }
        switch (pageName) {
            case "todo":
                await mcpExecutionContext.actor.visits(new TodoPage(mcpExecutionContext.page))
                break;
            default:
                return { content: [{ type: "text", text: `page not handled` }] }
        }
        return {
            content: [{ type: "text", text: `Page ${mcpExecutionContext.page.url} opened` }]
        }
    }
}
