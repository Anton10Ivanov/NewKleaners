# Shadcn MCP Server v2.0

A comprehensive Model Context Protocol (MCP) server for managing shadcn/ui
components with advanced features for theme management, component analysis,
project scaffolding, and more.

## 🚀 Features

### Core Component Management

- **List Components**: Browse all available shadcn/ui components with filtering
- **Add Components**: Install components with a single command
- **Remove Components**: Uninstall components from your project
- **Component Info**: Get detailed information about specific components
- **Initialize**: Set up shadcn/ui in your project
- **Update**: Update all installed components to latest versions
- **Search & Filter**: Find components by category or search term

### 🎨 Theme Management

- **Create Themes**: Generate custom theme configurations
- **Switch Themes**: Dynamically change themes across your project
- **Export Themes**: Export themes in multiple formats (JSON, YAML, CSS)
- **Predefined Themes**: Built-in themes including Orange Peel brand theme

### 🔍 Component Analysis

- **Dependency Analysis**: Analyze component dependencies and conflicts
- **Usage Tracking**: Count component usage across your project
- **Bundle Size Estimation**: Estimate component impact on bundle size
- **Conflict Detection**: Identify potential component conflicts
- **Accessibility Scoring**: Assess component accessibility compliance

### 🏗️ Project Scaffolding

- **Template Creation**: Generate project templates with predefined components
- **Boilerplate Generation**: Create common patterns (forms, dashboards, auth)
- **Custom Components**: Generate custom components with advanced features
- **Storybook Integration**: Generate Storybook stories for components

### 📚 Documentation Tools

- **Auto Documentation**: Generate comprehensive component documentation
- **README Updates**: Automatically update project README with component info
- **API Documentation**: Generate API reference documentation
- **Usage Examples**: Create usage examples and code snippets

### ⚡ Performance & Optimization

- **Bundle Analysis**: Analyze bundle size and performance impact
- **Import Optimization**: Optimize imports for better tree-shaking
- **Tree-shaking Analysis**: Assess component tree-shaking capabilities
- **Performance Scoring**: Calculate performance scores for components

### 🧪 Testing & Quality

- **Test Generation**: Generate test files for components
- **Accessibility Testing**: Include accessibility test templates
- **Comprehensive Audits**: Run security, accessibility, and performance audits
- **Quality Scoring**: Assess overall component quality

## 🛠️ Available Tools

### Core Component Management

#### `list_components`

List all available shadcn/ui components with optional filtering.

- `category` (optional): Filter by component category
- `search` (optional): Search components by name or description

#### `add_component`

Add a shadcn/ui component to your project.

- `component` (required): Name of the component to add
- `overwrite` (optional): Whether to overwrite existing files

#### `remove_component`

Remove a shadcn/ui component from your project.

- `component` (required): Name of the component to remove

#### `init_shadcn`

Initialize shadcn/ui in your project.

- `style` (optional): Style variant (default: "default")
- `baseColor` (optional): Base color for theme (default: "slate")
- `cssVariables` (optional): Use CSS variables (default: true)

#### `get_component_info`

Get detailed information about a specific component.

- `component` (required): Name of the component

#### `list_installed_components`

List all currently installed components.

#### `update_components`

Update all installed components to latest versions.

### Theme Management

#### `create_theme`

Create a new custom theme configuration.

- `name` (required): Name of the theme
- `colors` (optional): Color palette for the theme
- `baseColor` (optional): Base color scheme

#### `switch_theme`

Switch to a different theme.

- `themeName` (required): Name of the theme to switch to

#### `export_theme`

Export current theme configuration.

- `format` (optional): Export format (json, yaml, css)
- `filename` (optional): Output filename

### Component Analysis

#### `analyze_component`

Analyze a component for dependencies, usage, and conflicts.

- `component` (required): Name of the component to analyze
- `includeUsage` (optional): Include usage analysis
- `includeBundleSize` (optional): Include bundle size analysis

#### `check_conflicts`

Check for component conflicts and dependency issues.

- `components` (optional): List of components to check

### Project Scaffolding

#### `create_template`

Create a project template with predefined components.

- `templateName` (required): Name of the template
- `components` (optional): Components to include
- `structure` (optional): Project structure configuration

#### `generate_boilerplate`

Generate boilerplate code for common patterns.

- `pattern` (required): Pattern type (form, dashboard, auth, etc.)
- `components` (optional): Components to include
- `outputPath` (optional): Output directory path

### Custom Component Generation

#### `generate_component`

Generate a custom component with advanced features.

- `name` (required): Component name
- `type` (optional): Component type (form, layout, display, etc.)
- `features` (optional): Features to include (variants, animations,
  accessibility)
- `includeTests` (optional): Include test files
- `includeStorybook` (optional): Include Storybook stories

### Documentation Tools

#### `generate_docs`

Generate documentation for components.

- `components` (optional): Components to document
- `format` (optional): Documentation format (md, html, json)
- `includeExamples` (optional): Include usage examples

#### `update_readme`

Update project README with component information.

- `includeInstallation` (optional): Include installation instructions
- `includeExamples` (optional): Include usage examples
- `includeApi` (optional): Include API documentation

### Performance & Optimization

#### `analyze_bundle`

Analyze bundle size and performance impact.

- `components` (optional): Components to analyze
- `includeTreeShaking` (optional): Include tree-shaking analysis

#### `optimize_imports`

Optimize component imports for better tree-shaking.

- `files` (optional): Files to optimize
- `dryRun` (optional): Show changes without applying them

### Testing & Quality

#### `generate_tests`

Generate test files for components.

- `components` (optional): Components to generate tests for
- `testFramework` (optional): Test framework (jest, vitest, testing-library)
- `includeAccessibility` (optional): Include accessibility tests

#### `run_audit`

Run comprehensive audit of components and project.

- `includeSecurity` (optional): Include security audit
- `includeAccessibility` (optional): Include accessibility audit
- `includePerformance` (optional): Include performance audit

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

The MCP server is configured in `.cursor/mcp.json` and `.mcp.json`. Cursor will
automatically detect and use the server.

## 💡 Example Commands

### Core Component Management

- "Show me all form components"
- "Add a button component to my project"
- "What components are currently installed?"
- "Update all my shadcn components"
- "Remove the dialog component"
- "Initialize shadcn with the new-york style"

### Theme Management

- "Create a new theme called 'dark-mode'"
- "Switch to the orange-peel theme"
- "Export my current theme as CSS"

### Component Analysis

- "Analyze the button component for conflicts"
- "Check for dependency conflicts between dialog and sheet"
- "Show me bundle size analysis for all components"

### Project Scaffolding

- "Create a dashboard template with card and table components"
- "Generate a form boilerplate"
- "Create an auth template"

### Custom Components

- "Generate a custom DataTable component with variants and accessibility"
- "Create a Modal component with animations and tests"

### Documentation

- "Generate documentation for all installed components"
- "Update my README with component information"
- "Create API documentation for the button component"

### Performance & Testing

- "Analyze bundle size for my components"
- "Optimize imports in my project files"
- "Generate tests for all components"
- "Run a comprehensive audit of my project"

## Configuration

The server is configured to work with the project structure:

- Components are installed to `components/ui/`
- Configuration is managed via `components.json`
- The server runs from the project root directory

## 📦 Dependencies

### Core Dependencies

- `@modelcontextprotocol/sdk`: Core MCP functionality
- `@modelcontextprotocol/server-filesystem`: File system operations
- `shadcn/ui`: Component library (installed via npx)

### Enhanced Dependencies

- `axios`: HTTP client for API requests
- `chalk`: Terminal string styling
- `commander`: Command-line interface
- `fs-extra`: Enhanced file system operations
- `glob`: File pattern matching
- `js-yaml`: YAML parsing and generation
- `lodash`: Utility functions
- `ora`: Elegant terminal spinners
- `semver`: Semantic versioning
- `simple-git`: Git operations
- `ts-morph`: TypeScript AST manipulation
- `uuid`: UUID generation
- `zod`: Schema validation

## Error Handling

The server provides detailed error messages for common issues:

- Component not found
- Component already installed
- Missing dependencies
- File system errors
- shadcn CLI errors
