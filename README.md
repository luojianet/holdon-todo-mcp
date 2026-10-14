# HoldOn Todo (Cursor Plugin)

Manage [HoldOn Todo](https://todo.holdon.ltd) from Cursor via MCP: list, create, complete, and update todos.

## Install (Cursor Marketplace)

1. Install **holdon-todo** from the Cursor Marketplace (or load this repo under `~/.cursor/plugins/local/holdon-todo` for local testing).
2. Open **Plugins → Configure** and set **HoldOn PAT**.
3. Create a token: sign in / register at [todo.holdon.ltd](https://todo.holdon.ltd) → sidebar **Extensions & tokens** → **Create Cursor MCP token** (`todo:read` / `todo:write`).

## Manual MCP (`mcp.json`)

```json
{
  "mcpServers": {
    "holdon-todo": {
      "command": "node",
      "args": ["/absolute/path/to/holdon-todo-mcp/dist/index.js"],
      "env": {
        "HOLDON_PAT": "holdon_pat_…"
      }
    }
  }
}
```

Optional: `HOLDON_API_BASE` (default `https://api.holdon.ltd/api/v1`).

## Tools

| Tool | Description |
|------|-------------|
| `todo_groups_list` | List groups |
| `todo_list` | List todos (`status`: 1 open / 2 done) |
| `todo_create` | Create a todo |
| `todo_complete` | Mark done |
| `todo_update` | Update content / status |

## Develop

```bash
npm install
npm run prepare-dist
```

Local plugin test: symlink this directory to `~/.cursor/plugins/local/holdon-todo`, set `HOLDON_PAT` in plugin config, reload Cursor.

## License

MIT. See [PRIVACY.md](./PRIVACY.md).
