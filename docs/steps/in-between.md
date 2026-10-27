# Refactoring project structure

In order to separate concerns for the future, we are using `pnpm workspaces` to separate the next phases of the project.

## Steps

- Adding the two folders we are using for the project to `pnpm-workspace.yaml`
  
```yaml
  packages:
  - 'packages/*'
  - 'apps/*'
```

- Move all the code done on Phase 1 to its folder

```bash
mkdir -p packages/git-mcp-server apps
git mv src package.json tsconfig.json packages/git-mcp-server/
```
