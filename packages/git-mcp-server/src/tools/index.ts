import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerGitCommitsTool } from "@/tools/git-commits";

export function registerAllTools(server: McpServer): void {
  registerGitCommitsTool(server);
}
