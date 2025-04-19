import { runServer } from '@mcp-servers/common';
import { lotteryTools } from '@mcp-servers/lottery-shared';
import { weatherTools } from '@mcp-servers/weather-shared';

runServer('All-in-one', '0.0.1', new Map([...lotteryTools, ...weatherTools]));
