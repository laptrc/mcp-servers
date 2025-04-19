# Weather MCP Server

MCP Server for checking weather conditions.

## Tools

1. `weather_current`
   - Get current weather conditions for a city
   - Required inputs:
     - `city` (string): City name (e.g., 'Thanh pho Ho Chi Minh', 'Ha Noi')
   - Optional inputs:
     - `units` (string, default: 'metric'): Units of measurement ('standard' or 'metric' or 'imperial')
     - `lang` (string, default: 'vi'): Language of the output
   - Returns: Current weather conditions of the city

## Setup

### Build

NX build:

```bash
nx run weather:build:production
```

### Usage with Visual Studio Code

Add the following to your `.vscode/mcp.json` or `settings.json` files:

#### node

```json
{
  "mcp": {
    "inputs": [
      {
          "type": "promptString",
          "id": "OPEN_WEATHER_MAP_API_KEY",
          "description": "OpenWeatherMap API key",
          "password": true
      },
    ],
    "servers": {
      "weather": {
        "command": "node",
        "args": [
          "your-path/mcp-servers/dist/apps/weather/main.js",
        ],
        "env": {
          "OPEN_WEATHER_MAP_API_KEY": "${input:OPEN_WEATHER_MAP_API_KEY}"
        }
      }
    }
  }
}
```

### Environment Variables

1. `OPEN_WEATHER_MAP_API_KEY`: Required. The OpenWeatherMap API key, you can generate your own key [here](https://home.openweathermap.org/api_keys) for free.

### Troubleshooting

If you encounter errors, verify that:
1. Make sure the path is `your-path/mcp-servers/dist/apps/weather/main.js`, not `your-path/mcp-servers/dist/apps/lottery/apps/weather/main.js`
2. OpenWeatherMap API key is valid

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.