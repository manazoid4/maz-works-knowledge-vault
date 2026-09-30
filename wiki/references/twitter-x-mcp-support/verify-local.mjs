import assert from 'node:assert/strict';
import { Client } from 'file:///C:/Users/manaz/mcp-servers/twitter-X-mcp-server/node_modules/@modelcontextprotocol/sdk/dist/esm/client/index.js';
import { StdioClientTransport } from 'file:///C:/Users/manaz/mcp-servers/twitter-X-mcp-server/node_modules/@modelcontextprotocol/sdk/dist/esm/client/stdio.js';
const client=new Client({name:'local-install-verifier',version:'1.0.0'});
const transport=new StdioClientTransport({command:process.execPath,args:['C:/Users/manaz/.config/mcp/x-tools/launch.mjs'],stderr:'pipe'});
let diagnostic='';transport.stderr.on('data',chunk=>diagnostic+=chunk);
try {
 await client.connect(transport);
 const {tools}=await client.listTools();assert.deepEqual(tools.map(tool=>tool.name),['searchTwitter']);
 const result=await client.callTool({name:'searchTwitter',arguments:{query:'from:OpenAI',section:'latest',limit:1}});
 console.log(JSON.stringify({handshake:'passed',tools:tools.map(tool=>tool.name),result},null,2));
} finally {await client.close();}
