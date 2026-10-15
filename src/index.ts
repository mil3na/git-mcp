import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "./server.js";

async function main() {
  const server = createServer();
  //This is responsible for the transport layer of the MCP server, handling communication over standard input/output.
  // Communication is done using JSON-RPC messages. The stdin/stdout streams are reserved for JSON-RPC communication.
  // That's why the logs are made with console.error, so they don't interfere with the JSON-RPC messages on stdout.
  const transport = new StdioServerTransport();

  // Listen to transport-level errors
  transport.onerror = (error) => {
    console.error("MCP Transport error:", error);
  };

  // Clean exit when host closes stdin/transport
  transport.onclose = () => {
    console.error("MCP Transport closed by client.");
    process.exit(0);
  };

  // Handle OS termination signals
  const cleanup = async () => {
    console.error("Shutting down Git MCP Server...");
    await server.close();
    process.exit(0);
  };

  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);

  try {
    await server.connect(transport);
    console.error("Git MCP Server running on stdio");
  } catch (error) {
    console.error("Failed to connect transport:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Fatal error starting server:", error);
  process.exit(1);
});
