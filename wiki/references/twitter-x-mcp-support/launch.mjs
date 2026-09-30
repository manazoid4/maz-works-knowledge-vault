import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import { parseEnv } from 'node:util';

// Load credentials before importing upstream: its tool module captures env at import time.
const directory = path.dirname(fileURLToPath(import.meta.url));
const keyFile = process.env.X_TOOLS_ENV_FILE || path.join(directory, '.env');
if (fs.existsSync(keyFile)) {
  const values = parseEnv(fs.readFileSync(keyFile, 'utf8'));
  if (!process.env.RAPIDAPI_KEY && values.RAPIDAPI_KEY) process.env.RAPIDAPI_KEY = values.RAPIDAPI_KEY;
}
const upstream = path.resolve(directory, '../../../mcp-servers/twitter-X-mcp-server');
process.chdir(upstream);
// Axios errors contain request headers. Keep diagnostics, never serialize request objects.
const stderr = console.error.bind(console);
console.error = (...values) => stderr(...values.map(value => {
  const text = value instanceof Error ? `${value.name}: ${value.message}` : typeof value === 'object' ? '[diagnostic object omitted]' : String(value);
  return process.env.RAPIDAPI_KEY ? text.replaceAll(process.env.RAPIDAPI_KEY, '[redacted]') : text;
}));
const { default: axios } = await import(pathToFileURL(path.join(upstream, 'node_modules/axios/index.js')).href);
axios.defaults.timeout = 15000;
axios.defaults.maxRedirects = 0;
await import(pathToFileURL(path.join(upstream, 'main.js')).href);
