import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { app } from "./mcp/service/app.js";
import { server } from "./mcp/mcpServer/mcpServer.js";

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`MCP Stateless Streamable HTTP Server listening on port ${PORT}`);
});

// Stdio
const stdio = new StdioServerTransport();
await server.connect(stdio)
console.log("MCP stdio up")