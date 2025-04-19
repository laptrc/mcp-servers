import { lotteryTools, runServer, weatherTools } from '@mcp-servers/common';

runServer('All-in-one', '0.0.1', new Map([...lotteryTools, ...weatherTools]));
