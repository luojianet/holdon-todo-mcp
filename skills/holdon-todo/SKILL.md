---
name: holdon-todo
description: Read and write HoldOn todos via the holdon-todo MCP. Use when the user asks about todos, reminders, tasks, or HoldOn 待办.
---

# HoldOn Todo

Use the **holdon-todo** MCP tools for the user's HoldOn Todo product (`todo.holdon.ltd`).

## When to use

- List open or completed todos
- Add a todo / reminder
- Mark a todo done
- Edit todo text or reopen (status 1)

## Tools

| Tool | Purpose |
|------|---------|
| `todo_groups_list` | List groups |
| `todo_list` | List items (`status` 1 open / 2 done) |
| `todo_create` | Create (`content`) |
| `todo_complete` | Mark done by `uuid` |
| `todo_update` | Change `content` and/or `status` |

## Notes

- Requires `HOLDON_PAT` configured in the plugin (HoldOn PAT with `todo:read` / `todo:write`).
- Prefer listing before completing when the uuid is unknown.
- Do not invent uuids; use values returned by `todo_list` / `todo_create`.
