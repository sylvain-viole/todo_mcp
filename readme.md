# Project Overview

This project is a Playwright end-to-end testing setup for a todo application and a proof of concept towards an MCP-designed e2e test framework which allows test scenarios to be built from a human-readable instruction using Model Context Protocol (MCP).

## Configuration

-   **Dependencies:** Defined in `package.json`. The following table lists the key dependencies:

    | Dependency        | Description                                        |
    | ----------------- | -------------------------------------------------- |
    | `playwright`      | Core end-to-end testing framework                 |
    | `@playwright/test` | Playwright's test runner                          |
    | `zod`             | Library for data validation                      |

## How to Run

1.  **Install dependencies:** `npm install`
2.  **Build project:** `npm run build`
3.  **Start project:** `npm run start`
4.  **Run tests:** `npm test` (or potentially a custom script defined in `package.json`)

## How to run as MCP part

To run the mcp feature you need to have [goose](https://github.com/block/goose) installed and a llm provider configured.

1.  Run `npm run start`
2.  Browse to the `goose` folder an run 
```bash 
bash ./test.sh ./todo.txt
```

This will launch goose to execute tests

---
The MCP server exposes the following tools:

| Tool            | Description                                                                      |
| ---------------- | -------------------------------------------------------------------------------- |
| `browserSetTool`  | Sets the browser to be used for testing.                                        |
| `pageVisitTool`   | Navigates the browser to a specific page.                                      |
| `todoItemAssert`  | Asserts the state of a todo item (e.g., visibility, checked status).         |
| `todoItemTool`    | Adds or checks a todo item.                                                |

## Folder Breakdown

-   `package.json`: Contains project dependencies and scripts.
-   `playwright.config.ts`: Playwright configuration file.

### `src` directory

The `src` directory contains the main source code for the project.

#### `src/actions` directory

The `src/actions` directory implements the screenplay pattern, defining user interaction flows as reusable actions. It contains `Actor.ts`.

#### `src/elements` directory

The `src/elements` directory contains DOM element locators, providing a centralized place to manage UI element references. It contains `abstract.page.ts`, a `components` directory, and `todo.page.ts`.

#### `src/mcp` directory

The `src/mcp` directory implements a Model Context Protocol (MCP) server. This server exposes tools for LLMs through an Express server, enabling natural language control and analysis of the tests. It contains `executionContext.ts`, an `mcpServer` directory, a `service` directory, a `tools` directory containing the implementations for the MCP tools, and `ToolsInterface.ts`.

#### `src/tests` directory

The `src/tests` directory implements end-to-end test scenarios. It contains a `todoPageTests` directory containing the test files for the todo application.

-   `src/index.ts`: Contains project related files.

### MCP Server Tools

The MCP server exposes tools for LLMs to interact with the todo application. These tools' implementations are located in the `src/mcp/tools` directory.

## Test Scenarios

Test scenarios are located in `src/tests`. These tests use Playwright to automate browser interactions and verify the todo application's behavior.

## Contributing

Contributions are welcome!

## License

This project is open-source and available under the [MIT License](link-to-license).
