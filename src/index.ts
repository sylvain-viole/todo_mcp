import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import express from "express";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { browserSetTool } from "./mcp/tools/browserSetTool.js";
import { pageVisit } from "./mcp/tools/pageVisitTool.js";
import { assertLocatorVisible } from "./mcp/tools/assertLocatorVisible.js";
import { todoItemAdd } from "./mcp/tools/todoItemAdd.js";


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
      pageVisit.list,
      todoItemAdd.list,
      assertLocatorVisible.list,]
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  switch (request.params.name) {
    case "browser_set":
      return browserSetTool.call(request.params.arguments!!.browserName);
    case "page_visit":
      return pageVisit.call(request.params.arguments!!.pageName);
    case "todo_add":
        return todoItemAdd.call(request.params.arguments!!.itemName);
    case "assert_locator_visible":
      return assertLocatorVisible.call(request.params.arguments!!.itemName);
  }
  throw new Error("Tool not found");
});

const app = express();
app.use(express.json());

app.post('/mcp', (req, res) => {
  // In stateless mode, create a new instance of transport and server for each request
  // to ensure complete isolation. A single instance would cause request ID collisions
  // when multiple clients connect concurrently.

  try {
    const transport: StreamableHTTPServerTransport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });
    res.on('close', () => {
      console.log('Request closed');
      transport.close();
      server.close();
    });
    server.connect(transport);
    transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error('Error handling MCP request:', error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: 'Internal server error',
        },
        id: null,
      });
    }
  }
});

app.get('/mcp', (req, res) => {
  console.log('Received GET MCP request');
  res.writeHead(405).end(JSON.stringify({
    jsonrpc: "2.0",
    error: {
      code: -32000,
      message: "Method not allowed."
    },
    id: null
  }));
});

app.delete('/mcp', (req, res) => {
  console.log('Received DELETE MCP request');
  res.writeHead(405).end(JSON.stringify({
    jsonrpc: "2.0",
    error: {
      code: -32000,
      message: "Method not allowed."
    },
    id: null
  }));
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`MCP Stateless Streamable HTTP Server listening on port ${PORT}`);
});

// Stdio
const stdio = new StdioServerTransport();
await server.connect(stdio)
console.log("MCP stdio up")