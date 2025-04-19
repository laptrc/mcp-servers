import { runServer } from '@mcp-servers/common';
import { weatherTools } from '@mcp-servers/weather-shared';

runServer('Weather', '0.0.1', weatherTools);
