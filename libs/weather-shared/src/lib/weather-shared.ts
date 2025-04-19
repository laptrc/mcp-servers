import { CallToolRequest, Tool } from '@modelcontextprotocol/sdk/types';

import { RegisteredTool, Tools } from '@mcp-servers/common';

// Type definitions for OpenWeatherMap API response
export type WeatherStatus = {
  name: string;
  weather: WeatherInfo[];
  main: WeatherMain;
  wind: WeatherWind;
  rain: WeatherRain;
  clouds: WeatherClouds;
};

export type WeatherInfo = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type WeatherMain = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
};

export type WeatherWind = {
  speed: number;
  deg: number;
  gust: number;
};

export type WeatherRain = {
  [`1h`]: number;
  [`3h`]: number;
};

export type WeatherClouds = {
  all: number;
};

// Type definitions for tool arguments
type CurrentArgs = {
  city: string;
  units: string;
  lang: string;
};

// Tool definitions
const currentTool: Tool = {
  name: 'weather_current',
  description: 'Get current weather conditions for a city',
  inputSchema: {
    type: 'object',
    properties: {
      city: {
        type: 'string',
        description: `City name (e.g., 'Thanh pho Ho Chi Minh', 'Ha Noi')`,
      },
      units: {
        type: 'string',
        description: `Units of measurement ('standard' or 'metric' or 'imperial', default: 'metric')`,
        default: 'metric',
      },
      lang: {
        type: 'string',
        description: `Language of the output (default: 'vi')`,
        default: 'vi',
      },
    },
    required: ['city'],
  },
};

// Register tools
export const weatherTools = new Map<string, RegisteredTool>([
  [
    currentTool.name,
    {
      value: currentTool,
      handler: async (request: CallToolRequest) => {
        const args = request.params.arguments as unknown as CurrentArgs;

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${
          args.city
        }&appid=${process.env['OPEN_WEATHER_MAP_API_KEY']}&lang=${
          args.lang || 'vi'
        }&units=${args.units || 'metric'}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const weatherStatus: WeatherStatus = await response.json();

        let result = `
General: ${weatherStatus.weather?.map((w) => w.description)?.join(', ')}
Temperature: ${weatherStatus.main.temp_min}${
          weatherStatus.main.temp_max !== weatherStatus.main.temp_min
            ? '-' + weatherStatus.main.temp_max
            : ''
        }
Humidity: ${weatherStatus.main.humidity}
Pressure: ${weatherStatus.main.pressure}
Wind: ${weatherStatus.wind.speed}
Clouds: ${weatherStatus.clouds.all}`;

        if (weatherStatus.rain) {
          if (weatherStatus.rain['1h']) {
            result = `${result}
Rain (1h): ${weatherStatus.rain['1h']}`;
          }

          if (weatherStatus.rain['3h']) {
            result = `${result}
Rain (3h): ${weatherStatus.rain['3h']}`;
          }
        }

        return {
          content: [{ type: 'text', text: result }],
        };
      },
    } as RegisteredTool,
  ],
]) as Tools;
