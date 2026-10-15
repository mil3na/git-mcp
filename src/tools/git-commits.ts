import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { simpleGit } from "simple-git";
import { z } from "zod";

export function registerGitCommitsTool(server: McpServer): void {
  //A factory function that attaches this tool to your server instance.
  server.registerTool(
    // This creates a schema for the tool input arguments.
    "get_recent_commits",
    {
      // Descriptions here are important for the AI model to understand what this tool does and how to use it.
      title: "Get Recent Commits",
      description: "Retrieves recent git commit logs from a local repository.",
      inputSchema: {
        repoPath: z
          .string()
          .describe("Absolute or relative path to the local git repository"),
        count: z
          .number()
          .optional()
          .default(5)
          .describe("Number of commits to return (default: 5)"),
      },
    },

    // The actual implementation of the tool. This function will be called when the tool is invoked.
    async ({ repoPath, count }) => {
      try {
        const git = simpleGit(repoPath);
        const log = await git.log({ maxCount: count });

        const commits = log.all.map((c) => ({
          hash: c.hash.substring(0, 7),
          author: c.author_name,
          date: c.date,
          message: c.message,
        }));

        return {
          // MCP requires tools to return a standard structure containing a content array with typed blocks.
          content: [
            {
              type: "text",
              text: JSON.stringify(commits, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Git operation failed: ${(error as Error).message}`,
            },
          ],
        };
      }
    }
  );
}
