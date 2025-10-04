# Shadcn MCP Server

A custom Model Context Protocol (MCP) server for managing shadcn/ui components in your project.

## Features

- **List Components**: Browse all available shadcn/ui components
- **Add Components**: Install components with a single command
- **Remove Components**: Uninstall components from your project
- **Component Info**: Get detailed information about specific components
- **Initialize**: Set up shadcn/ui in your project
- **Update**: Update all installed components to latest versions
- **Search & Filter**: Find components by category or search term

## Available Tools

### `list_components`
List all available shadcn/ui components with optional filtering.

**Parameters:**
- `category` (optional): Filter by component category (form, layout, navigation, etc.)
- `search` (optional): Search components by name or description

### `add_component`
Add a shadcn/ui component to your project.

**Parameters:**
- `component` (required): Name of the component to add
- `overwrite` (optional): Whether to overwrite existing component files (default: false)

### `remove_component`
Remove a shadcn/ui component from your project.

**Parameters:**
- `component` (required): Name of the component to remove

### `init_shadcn`
Initialize shadcn/ui in your project.

**Parameters:**
- `style` (optional): Style variant - "default" or "new-york" (default: "default")
- `baseColor` (optional): Base color for the theme (default: "slate")
- `cssVariables` (optional): Use CSS variables for theming (default: true)

### `get_component_info`
Get detailed information about a specific component.

**Parameters:**
- `component` (required): Name of the component

### `list_installed_components`
List all shadcn/ui components currently installed in your project.

### `update_components`
Update all installed shadcn/ui components to their latest versions.

## Usage

### Development Mode
```bash
npm run mcp:dev
```

### Production Mode
```bash
npm run mcp:build
npm run mcp:start
```

### With Cursor IDE
The MCP server is configured in `.cursor/mcp.json` and `.mcp.json`. Cursor will automatically detect and use the server.

## Example Commands

- "Show me all form components"
- "Add a button component to my project"
- "What components are currently installed?"
- "Update all my shadcn components"
- "Remove the dialog component"
- "Initialize shadcn with the new-york style"

## Configuration

The server is configured to work with the project structure:
- Components are installed to `components/ui/`
- Configuration is managed via `components.json`
- The server runs from the project root directory

## Dependencies

- `@modelcontextprotocol/sdk`: Core MCP functionality
- `@modelcontextprotocol/server-filesystem`: File system operations
- `shadcn/ui`: Component library (installed via npx)

## Error Handling

The server provides detailed error messages for common issues:
- Component not found
- Component already installed
- Missing dependencies
- File system errors
- shadcn CLI errors
