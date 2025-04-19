# Vietnam Lottery MCP Server

MCP Server for checking Vietnam lottery results.

## Tools

1. `lottery_check`
   - Check lottery result
   - Required inputs:
     - `location` (string): Location/place of the lottery
     - `date` (string): Date of the lottery
   - Returns: Result of the lottery

## Setup

### Build

NX build:

```bash
nx run lottery:build:production
```

### Usage with Visual Studio Code

Add the following to your `.vscode/mcp.json` or `settings.json` files:

#### node

```json
{
  "mcp": {
    "servers": {
      "lottery": {
        "command": "node",
        "args": [
          "your-path/mcp-servers/dist/apps/lottery/main.js",
        ]
      }
    }
  }
}
```

### Environment Variables

No environment variables.

### Troubleshooting

If you encounter errors, verify that:
1. Make sure the path is `your-path/mcp-servers/dist/apps/lottery/main.js`, not `your-path/mcp-servers/dist/apps/lottery/apps/lottery/main.js`

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.