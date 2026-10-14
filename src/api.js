const API_BASE = (process.env.HOLDON_API_BASE || 'https://api.holdon.ltd/api/v1').replace(/\/$/, '');
const PAT = (process.env.HOLDON_PAT || '').trim();

export function requirePat() {
  if (!PAT) {
    throw new Error(
      'HOLDON_PAT is not set. Create a Cursor MCP token in HoldOn Notes → Extensions & tokens, then configure the plugin variable.',
    );
  }
}

export async function api(method, path, body) {
  requirePat();
  const url = path.startsWith('http') ? path : `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;
  const headers = {
    Authorization: `Bearer ${PAT}`,
    Accept: 'application/json',
  };
  let payload;
  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
    payload = JSON.stringify(body);
  }
  const res = await fetch(url, { method, headers, body: payload });
  const text = await res.text();
  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`HoldOn API returned non-JSON (HTTP ${res.status}): ${text.slice(0, 200)}`);
  }
  if (res.status === 401) {
    throw new Error('Invalid or under-scoped PAT (401). Create a new token with todo:read / todo:write.');
  }
  if (!res.ok || json.code !== 200) {
    throw new Error(json.msg || `HoldOn API error HTTP ${res.status}`);
  }
  return json.data;
}

export function textResult(obj) {
  const text = typeof obj === 'string' ? obj : JSON.stringify(obj, null, 2);
  return { content: [{ type: 'text', text }] };
}
