import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { browserSetTool } from "../tools/browserSetTool.js";
import { pageVisitTool } from "../tools/pageVisitTool.js";
import { todoItemAddTool, todoItemCheckTool } from "../tools/todoItemTool.js";
import { assertTodoItemCheckedStatus, assertTodoItemVisible } from "../tools/todoItemAssert.js";

const server = new Server({
  name: "example-server",
  version: "1.0.0"
}, {
  capabilities: {
    tools: {}
  }
});

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      browserSetTool.list,
      pageVisitTool.list,
      todoItemAddTool.list,
      todoItemCheckTool.list,
      assertTodoItemVisible.list,
      assertTodoItemCheckedStatus.list]
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  switch (request.params.name) {
    case "browser_set":
      return browserSetTool.call(request.params.arguments!!.browserName);
    case "page_visit":
      return pageVisitTool.call(request.params.arguments!!.pageName);
    case "todo_add":
      return todoItemAddTool.call(request.params.arguments!!.itemName);
    case "todo_check":
      return todoItemCheckTool.call(request.params.arguments!!.itemName);
    case "assert_item_visible":
      return assertTodoItemVisible.call(request.params.arguments!!.itemName);
    case "assert_item_checked_status":
      return assertTodoItemCheckedStatus.call(request.params.arguments)
  }
  throw new Error("Tool not found");
});


export { server }