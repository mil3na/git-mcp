# Steps needed to create this project

## Setup

```bash
corepack enable #only needed to be ran once, here just for context

mkdir git-mcp
cd git-mcp
# create this file

pnpm init
corepack use pnpm@latest

pnpm add @modelcontextprotocol/sdk zod simple-git
pnpm add -D typescript @types/node tsx

pnpm approve-builds #for esbuild be able to... build

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

## Implementing Server
