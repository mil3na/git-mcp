import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerAllTools } from "@/tools";

export function createServer(): McpServer {
  const server = new McpServer({
    name: "git-mcp-server",
    version: "1.0.0",
  });

  registerAllTools(server);

  return server;
}
