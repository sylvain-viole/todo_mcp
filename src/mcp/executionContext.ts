import { Browser, Page } from "@playwright/test"
import { Actor } from "src/actions/Actor.js"

export const mcpExecutionContext: {
    browser: Browser | undefined,
    page: Page | undefined,
    actor: Actor | undefined
} = {
    browser: undefined,
    page: undefined,
    actor: undefined
}
