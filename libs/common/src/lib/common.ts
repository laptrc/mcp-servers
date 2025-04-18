import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequest,
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';

import * as Dayjs from 'dayjs';
import * as CustomParseFormat from 'dayjs/plugin/customParseFormat';
import * as IsSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import * as Utc from 'dayjs/plugin/utc';
import * as Timezone from 'dayjs/plugin/timezone';

/* eslint-disable @typescript-eslint/no-explicit-any */
const dayjs = (Dayjs as any).default;
const customParseFormat = (CustomParseFormat as any).default;
const isSameOrBefore = (IsSameOrBefore as any).default;
const utc = (Utc as any).default;
const timezone = (Timezone as any).default;
/* eslint-enable @typescript-eslint/no-explicit-any */

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(utc);
dayjs.extend(timezone);

export type RegisteredTool = {
  value: Tool;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: (request: CallToolRequest) => Promise<any>;
};

export type Tools = Map<string, RegisteredTool>;

export function runServer(name: string, version: string, tools: Tools): void {
  const main = async () => {
    console.error(`Starting ${name} MCP Server...`);
    const server = new Server(
      {
        name: 'Lottery MCP Server',
        version,
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    server.setRequestHandler(
      CallToolRequestSchema,
      async (request: CallToolRequest) => {
        console.error('Received CallToolRequest:', request);
        try {
          if (!request.params.arguments) {
            throw new Error('No arguments provided');
          }

          const tool = tools.get(request.params.name);

          if (!tool) {
            throw new Error(`Unknown tool: ${request.params.name}`);
          }

          return await tool.handler(request);
        } catch (error) {
          console.error('Error executing tool:', error);
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  error: error instanceof Error ? error.message : String(error),
                }),
              },
            ],
          };
        }
      }
    );

    server.setRequestHandler(ListToolsRequestSchema, async () => {
      console.error('Received ListToolsRequest');
      return {
        tools: Array.from(tools.values()).map(
          (tool: RegisteredTool) => tool.value
        ),
      };
    });

    const transport = new StdioServerTransport();
    console.error('Connecting server to transport...');
    await server.connect(transport);

    console.error(`${name} MCP Server running on stdio`);
  };

  main().catch((error) => {
    console.error('Fatal error in main():', error);
    process.exit(1);
  });
}
