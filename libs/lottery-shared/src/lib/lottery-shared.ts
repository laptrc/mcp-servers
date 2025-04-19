import { CallToolRequest, Tool } from '@modelcontextprotocol/sdk/types';
import * as Dayjs from 'dayjs';
import fetch from '@web-master/node-web-fetch';

import {
  DateUtil,
  DefaultTimeZone,
  RegisteredTool,
  StringUtil,
  Tools,
} from '@mcp-servers/common';

/* eslint-disable @typescript-eslint/no-explicit-any */
const dayjs = (Dayjs as any).default;
/* eslint-enable @typescript-eslint/no-explicit-any */

// Type definitions for fetch response
export type LotteryResponse = {
  title: string;
  date: string;
  prizeNames: string[];
  prizes: LotteryPrice[];
};

export type LotteryPrice = {
  items: string[];
};

// Type definitions for tool arguments
type CheckArgs = {
  location: string;
  date: string;
};

// Tool definitions
const checkTool: Tool = {
  name: 'lottery_check',
  description: 'Check Vietnam lottery results',
  inputSchema: {
    type: 'object',
    properties: {
      location: {
        type: 'string',
        description: 'Location/place of the lottery',
      },
      date: {
        type: 'string',
        description: 'Date of the lottery',
      },
    },
    required: ['location', 'date'],
  },
};

// Register tools
export const lotteryTools = new Map<string, RegisteredTool>([
  [
    checkTool.name,
    {
      value: checkTool,
      handler: async (request: CallToolRequest) => {
        const args = request.params.arguments as unknown as CheckArgs;

        let location = StringUtil.toUrlPath(args.location);

        if (location.includes('ho-chi-minh') || location.includes('hcm')) {
          location = 'tp-hcm';
        }
        if (location.includes('hue')) {
          location = 'thua-thien-hue';
        }

        const date = dayjs(args.date).tz(DefaultTimeZone).startOf('day');

        const url = `https://www.minhchinh.com/embed/minhchinh.php?id=${location}&date=${date.format(
          DateUtil.DayMonthYearDashFormat
        )}`;

        const data: LotteryResponse = await fetch({
          target: url,
          fetch: {
            title: 'table tr.title td span.tendai a',
            date: 'table tr.title td span.ngay a',
            prizeNames: {
              listItem: 'table tr[class*="giai"] td.tengiai',
            },
            prizes: {
              listItem: 'table tr[class*="giai"] td.giai',
              data: {
                items: {
                  listItem: 'div[class*="lq"]',
                },
              },
            },
          },
        });

        const result = data.prizeNames
          .map(
            (priceName, index) =>
              `${priceName}: ${data.prizes[index].items.join(', ')}`
          )
          .join('\n');

        return {
          content: [{ type: 'text', text: result }],
        };
      },
    } as RegisteredTool,
  ],
]) as Tools;
