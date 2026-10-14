#!/usr/bin/env node
/**
 * HoldOn Todo MCP (stdio).
 * env: HOLDON_PAT (required), HOLDON_API_BASE (optional, default https://api.holdon.ltd/api/v1)
 */
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

import { api, textResult } from './api.js';

const server = new McpServer({
  name: 'holdon-todo',
  version: '0.1.0',
});

server.tool(
  'todo_groups_list',
  'List HoldOn todo groups (for matching group uuids when organizing items).',
  {},
  async () => {
    const data = await api('GET', '/todo/groups');
    return textResult(data);
  },
);

server.tool(
  'todo_list',
  'List HoldOn todos. status: 1=open, 2=done; omit for all.',
  {
    status: z.number().int().optional().describe('1 open / 2 done'),
  },
  async ({ status }) => {
    const q = status != null ? `?status=${status}` : '';
    const data = await api('GET', `/todo/items${q}`);
    return textResult(data);
  },
);

server.tool(
  'todo_create',
  'Create a HoldOn todo. Use when the user asks to add a reminder or task. New items are ungrouped; use todo_list to verify.',
  {
    content: z.string().describe('Todo text, max 500 characters'),
  },
  async ({ content }) => {
    const text = content.trim();
    if (!text) throw new Error('content is required');
    const data = await api('POST', '/todo/items', { content: text.slice(0, 500) });
    return textResult(data);
  },
);

server.tool(
  'todo_complete',
  'Mark a HoldOn todo as done (status=2). Call todo_list first if uuid is unknown.',
  {
    uuid: z.string().describe('Todo uuid'),
  },
  async ({ uuid }) => {
    const data = await api('PUT', `/todo/items/${uuid.trim()}`, { status: 2 });
    return textResult(data);
  },
);

server.tool(
  'todo_update',
  'Update a HoldOn todo content or status. status: 1=open, 2=done.',
  {
    uuid: z.string(),
    content: z.string().optional(),
    status: z.number().int().optional(),
  },
  async ({ uuid, content, status }) => {
    const body = {};
    if (content !== undefined) body.content = content;
    if (status !== undefined) body.status = status;
    if (!Object.keys(body).length) throw new Error('provide content and/or status');
    const data = await api('PUT', `/todo/items/${uuid.trim()}`, body);
    return textResult(data);
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
