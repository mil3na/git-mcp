# Phase 1: simple MCP server

## Setup

```bash
corepack enable #only needed to be ran once, here just for context

mkdir git-mcp
cd git-mcp

pnpm init
corepack use pnpm@latest

pnpm add @modelcontextprotocol/sdk zod simple-git
pnpm add -D typescript @types/node tsx

pnpm approve-builds #for esbuild be able to... build

pnpm add -D tsup
```

- Update `package.json` with changing the main file (now in dist), scripts and metadata
- Create a `tsconfig.json`

- Add `prettier` and `prettier` configs. Also add it to package.json
  - `pnpm add -D prettier`
- Added project specific vscode configs
  - `mkdir -p .vscode && touch .vscode/settings.json`
-

- Adding git
  - Created .gitignore
  - `git init && git add . && git commit -m "Message"`

## Phase 1: Implementing Server

A server that inspects local git repositories, summarizes recent commits. When using `pnpm inspector` a new window
will open and you will have two tabs: severs and tools. Start the server and then go to tools where you will be asked
for the absolute path for the git repo you want to inspect.

(IMAGEM)

- AI generated src/index.js
- Changed `Server` to `McpServer` - `Server` is deprecated
  - then, changed `"server.tool"` to `"server.registerTool"`
- Concern separation for beter redability and understanding:
  - `index.js` now have only the main execution and error handling
  - the git tool is isolated at `tools/git-commits.ts`
  - tools folder have an `index.ts` that allows to add more tools in the future
  - server creation is now a Factory at `server.ts`

```bash
pnpm build 
pnpm inspector
```

MCP divides capabilities into three distinct primitives based on who initiates the action and how context is shared:

| Primitive | Real-world Concept | Control / Initiation | Example in Git MCP |
| :--- | :--- | :--- | :--- |
| **Tools** | Executable functions with side effects or dynamic computations | **Model-controlled** (The AI decides when and how to call them) | `get_recent_commits`, `git_diff`, `create_branch` |
| **Resources** | Read-only contextual data, documents, or file contents (like API GET endpoints) | **Application / User-controlled** (Attached as context or read by URI) | `git://repo/HEAD/README.md`, `git://repo/branches` |
| **Prompts** | Pre-engineered prompt templates with UI parameters | **User-controlled** (Slash commands or UI shortcuts chosen by the human) | `/summarize-recent-work`, `/review-staged-changes` |

This first phase, the "Tool" was built.

Rememember that the MCP server doesn't maintain state between tool calls; it acts as a lightweight bridge translating LLM intents into local system executions.
