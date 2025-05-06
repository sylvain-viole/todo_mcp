import { chromium, firefox } from "@playwright/test";
import { mcpExecutionContext } from "../executionContext.js";
import { MpcTools } from "../ToolsInterface.js";
import { Actor } from "../../actions/Actor.js";

export const browserSetTool: MpcTools = {
    list: {

        name: "browser_set",
        description: "Initiates and launches a browser",
        inputSchema: {
            type: "object",
            properties: {
                browserName: { type: "string" }
            }
        },
        required: ["browserName"],
    },
    call: async (browserName: string) => {

        switch (browserName) {
            case "chrome":
                mcpExecutionContext.browser = await chromium.launch({ headless: false });
                break;
            case "firefox":
                mcpExecutionContext.browser = await firefox.launch({ headless: false });
                break;
            default:
                return { content: [{ type: "text", text: `Browser ${browserName} not handled` }] }
        }

        const context = await mcpExecutionContext.browser?.newContext(
            {
                baseURL: "https://demo.playwright.dev"
            }
        );
        mcpExecutionContext.page = await context?.newPage()!!;
        mcpExecutionContext.actor = new Actor(mcpExecutionContext.page!!)
        return {
            content: [{ type: "text", text: `Browser ${browserName} launched` }]
        }
    }
} 
