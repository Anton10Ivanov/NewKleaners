#!/usr/bin/env node


import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get project root directory
const projectRoot = path.resolve(__dirname, '..');

interface ShadcnComponent {
  name: string;
  description: string;
  category: string;
  dependencies?: string[];
}

class ShadcnMCPServer {
  private server: Server;
  private components: ShadcnComponent[] = [];

  constructor() {
    this.server = new Server(
      {
        name: 'shadcn-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      },
    );

    this.setupHandlers();
    this.loadComponents();
  }

  private setupHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'list_components',
            description: 'List all available shadcn/ui components',
            inputSchema: {
              type: 'object',
              properties: {
                category: {
                  type: 'string',
                  description: 'Filter components by category (optional)',
                },
                search: {
                  type: 'string',
                  description: 'Search components by name or description (optional)',
                },
              },
            },
          },
          {
            name: 'add_component',
            description: 'Add a shadcn/ui component to the project',
            inputSchema: {
              type: 'object',
              properties: {
                component: {
                  type: 'string',
                  description: 'Name of the component to add',
                },
                overwrite: {
                  type: 'boolean',
                  description: 'Whether to overwrite existing component files',
                  default: false,
                },
              },
              required: ['component'],
            },
          },
          {
            name: 'remove_component',
            description: 'Remove a shadcn/ui component from the project',
            inputSchema: {
              type: 'object',
              properties: {
                component: {
                  type: 'string',
                  description: 'Name of the component to remove',
                },
              },
              required: ['component'],
            },
          },
          {
            name: 'init_shadcn',
            description: 'Initialize shadcn/ui in the project',
            inputSchema: {
              type: 'object',
              properties: {
                style: {
                  type: 'string',
                  description: 'Style variant (default, new-york)',
                  default: 'default',
                },
                baseColor: {
                  type: 'string',
                  description: 'Base color for the theme',
                  default: 'slate',
                },
                cssVariables: {
                  type: 'boolean',
                  description: 'Use CSS variables for theming',
                  default: true,
                },
              },
            },
          },
          {
            name: 'get_component_info',
            description: 'Get detailed information about a specific component',
            inputSchema: {
              type: 'object',
              properties: {
                component: {
                  type: 'string',
                  description: 'Name of the component',
                },
              },
              required: ['component'],
            },
          },
          {
            name: 'list_installed_components',
            description: 'List all shadcn/ui components currently installed in the project',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'update_components',
            description: 'Update all installed shadcn/ui components to their latest versions',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
        ],
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'list_components':
            return await this.listComponents(args as any);
          case 'add_component':
            return await this.addComponent(args as any);
          case 'remove_component':
            return await this.removeComponent(args as any);
          case 'init_shadcn':
            return await this.initShadcn(args as any);
          case 'get_component_info':
            return await this.getComponentInfo(args as any);
          case 'list_installed_components':
            return await this.listInstalledComponents();
          case 'update_components':
            return await this.updateComponents();
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  private loadComponents() {
    // Load component definitions from shadcn/ui registry
    this.components = [
      {
        name: 'button',
        description: 'Displays a button or a component that looks like a button',
        category: 'form',
        dependencies: ['@radix-ui/react-slot'],
      },
      {
        name: 'input',
        description: 'Displays a form input field',
        category: 'form',
        dependencies: [],
      },
      {
        name: 'label',
        description: 'Renders an accessible label associated with controls',
        category: 'form',
        dependencies: ['@radix-ui/react-label'],
      },
      {
        name: 'card',
        description: 'Displays a card with header, content, and footer',
        category: 'layout',
        dependencies: [],
      },
      {
        name: 'dialog',
        description: 'A window overlaid on either the primary window or another dialog window',
        category: 'overlay',
        dependencies: ['@radix-ui/react-dialog'],
      },
      {
        name: 'dropdown-menu',
        description: 'Displays a menu to the user',
        category: 'navigation',
        dependencies: ['@radix-ui/react-dropdown-menu'],
      },
      {
        name: 'navigation-menu',
        description: 'A collection of links for navigating websites',
        category: 'navigation',
        dependencies: ['@radix-ui/react-navigation-menu'],
      },
      {
        name: 'sheet',
        description: 'Extends the Dialog component to display content that complements the main content',
        category: 'overlay',
        dependencies: ['@radix-ui/react-dialog'],
      },
      {
        name: 'table',
        description: 'Powerful table and datagrids built using TanStack Table',
        category: 'data-display',
        dependencies: ['@tanstack/react-table'],
      },
      {
        name: 'toast',
        description: 'A succinct message that is displayed temporarily',
        category: 'feedback',
        dependencies: ['@radix-ui/react-toast'],
      },
      {
        name: 'tooltip',
        description: 'A popup that displays information related to an element',
        category: 'overlay',
        dependencies: ['@radix-ui/react-tooltip'],
      },
      {
        name: 'accordion',
        description: 'A vertically stacked set of interactive headings',
        category: 'disclosure',
        dependencies: ['@radix-ui/react-accordion'],
      },
      {
        name: 'alert',
        description: 'Displays a callout for user attention',
        category: 'feedback',
        dependencies: [],
      },
      {
        name: 'avatar',
        description: 'An image element with a fallback for representing the user',
        category: 'media',
        dependencies: ['@radix-ui/react-avatar'],
      },
      {
        name: 'badge',
        description: 'Small status descriptors for UI elements',
        category: 'data-display',
        dependencies: [],
      },
      {
        name: 'checkbox',
        description: 'A control that allows the user to toggle between checked and not checked',
        category: 'form',
        dependencies: ['@radix-ui/react-checkbox'],
      },
      {
        name: 'collapsible',
        description: 'An interactive component which expands/collapses a section',
        category: 'disclosure',
        dependencies: ['@radix-ui/react-collapsible'],
      },
      {
        name: 'command',
        description: 'Fast, composable, unstyled command menu for React',
        category: 'command',
        dependencies: ['cmdk'],
      },
      {
        name: 'context-menu',
        description: 'Displays a menu to the user',
        category: 'navigation',
        dependencies: ['@radix-ui/react-context-menu'],
      },
      {
        name: 'hover-card',
        description: 'For sighted users to preview content available behind a link',
        category: 'overlay',
        dependencies: ['@radix-ui/react-hover-card'],
      },
      {
        name: 'menubar',
        description: 'A visually persistent menu common in desktop applications',
        category: 'navigation',
        dependencies: ['@radix-ui/react-menubar'],
      },
      {
        name: 'popover',
        description: 'Displays rich content in a portal, triggered by a button',
        category: 'overlay',
        dependencies: ['@radix-ui/react-popover'],
      },
      {
        name: 'progress',
        description: 'Displays an indicator showing the completion progress of a task',
        category: 'feedback',
        dependencies: ['@radix-ui/react-progress'],
      },
      {
        name: 'radio-group',
        description: 'A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked',
        category: 'form',
        dependencies: ['@radix-ui/react-radio-group'],
      },
      {
        name: 'scroll-area',
        description: 'Augments native scroll functionality for custom, cross-browser styling',
        category: 'layout',
        dependencies: ['@radix-ui/react-scroll-area'],
      },
      {
        name: 'select',
        description: 'Displays a list of options for the user to pick from',
        category: 'form',
        dependencies: ['@radix-ui/react-select'],
      },
      {
        name: 'separator',
        description: 'Visually or semantically separates content',
        category: 'layout',
        dependencies: ['@radix-ui/react-separator'],
      },
      {
        name: 'skeleton',
        description: 'Use to show a placeholder while content is loading',
        category: 'feedback',
        dependencies: [],
      },
      {
        name: 'slider',
        description: 'An input where the user selects a value from within a given range',
        category: 'form',
        dependencies: ['@radix-ui/react-slider'],
      },
      {
        name: 'switch',
        description: 'A control that allows the user to toggle between on and off',
        category: 'form',
        dependencies: ['@radix-ui/react-switch'],
      },
      {
        name: 'tabs',
        description: 'A set of layered sections of content—known as tab panels',
        category: 'navigation',
        dependencies: ['@radix-ui/react-tabs'],
      },
      {
        name: 'textarea',
        description: 'Displays a form textarea or a component that looks like a textarea',
        category: 'form',
        dependencies: [],
      },
      {
        name: 'toggle',
        description: 'A two-state button that can be either on or off',
        category: 'form',
        dependencies: ['@radix-ui/react-toggle'],
      },
      {
        name: 'toggle-group',
        description: 'A set of two-state buttons that can be toggled on or off',
        category: 'form',
        dependencies: ['@radix-ui/react-toggle-group'],
      },
    ];
  }

  private async listComponents(args: { category?: string; search?: string }) {
    let filteredComponents = this.components;

    if (args.category) {
      filteredComponents = filteredComponents.filter(
        (comp) => comp.category === args.category,
      );
    }

    if (args.search) {
      const searchTerm = args.search.toLowerCase();
      filteredComponents = filteredComponents.filter(
        (comp) =>
          comp.name.toLowerCase().includes(searchTerm) ||
          comp.description.toLowerCase().includes(searchTerm),
      );
    }

    const componentList = filteredComponents
      .map(
        (comp) =>
          `**${comp.name}** (${comp.category})\n${comp.description}${
            comp.dependencies && comp.dependencies.length > 0
              ? `\nDependencies: ${comp.dependencies.join(', ')}`
              : ''
          }`,
      )
      .join('\n\n');

    return {
      content: [
        {
          type: 'text',
          text: `Found ${filteredComponents.length} components:\n\n${componentList}`,
        },
      ],
    };
  }

  private async addComponent(args: { component: string; overwrite?: boolean }) {
    const { component, overwrite = false } = args;

    // Check if component exists
    const componentInfo = this.components.find(
      (comp) => comp.name === component,
    );
    if (!componentInfo) {
      throw new Error(`Component '${component}' not found`);
    }

    // Check if component is already installed
    const componentPath = path.join(projectRoot, 'components', 'ui', `${component}.tsx`);
    if (fs.existsSync(componentPath) && !overwrite) {
      throw new Error(
        `Component '${component}' is already installed. Use overwrite: true to replace it.`,
      );
    }

    try {
      // Run shadcn add command
      const command = `npx shadcn@latest add ${component}${overwrite ? ' --overwrite' : ''}`;
      const output = execSync(command, {
        cwd: projectRoot,
        encoding: 'utf8',
        stdio: 'pipe',
      });

      return {
        content: [
          {
            type: 'text',
            text: `Successfully added component '${component}':\n\n${output}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to add component: ${error}`);
    }
  }

  private async removeComponent(args: { component: string }) {
    const { component } = args;

    const componentPath = path.join(projectRoot, 'components', 'ui', `${component}.tsx`);
    if (!fs.existsSync(componentPath)) {
      throw new Error(`Component '${component}' is not installed`);
    }

    try {
      // Remove the component file
      fs.unlinkSync(componentPath);

      // Also remove from components.json if it exists
      const componentsJsonPath = path.join(projectRoot, 'components.json');
      if (fs.existsSync(componentsJsonPath)) {
        const componentsJson = JSON.parse(
          fs.readFileSync(componentsJsonPath, 'utf8'),
        );
        // Note: shadcn doesn't track installed components in components.json
        // This is just for cleanup if needed
      }

      return {
        content: [
          {
            type: 'text',
            text: `Successfully removed component '${component}'`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to remove component: ${error}`);
    }
  }

  private async initShadcn(args: {
    style?: string;
    baseColor?: string;
    cssVariables?: boolean;
  }) {
    const { style = 'default', baseColor = 'slate', cssVariables = true } = args;

    try {
      const command = `npx shadcn@latest init --style ${style} --base-color ${baseColor} ${
        cssVariables ? '--css-variables' : ''
      }`;
      const output = execSync(command, {
        cwd: projectRoot,
        encoding: 'utf8',
        stdio: 'pipe',
      });

      return {
        content: [
          {
            type: 'text',
            text: `Successfully initialized shadcn/ui:\n\n${output}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to initialize shadcn/ui: ${error}`);
    }
  }

  private async getComponentInfo(args: { component: string }) {
    const { component } = args;

    const componentInfo = this.components.find(
      (comp) => comp.name === component,
    );
    if (!componentInfo) {
      throw new Error(`Component '${component}' not found`);
    }

    const isInstalled = fs.existsSync(
      path.join(projectRoot, 'components', 'ui', `${component}.tsx`),
    );

    return {
      content: [
        {
          type: 'text',
          text: `**${componentInfo.name}** (${componentInfo.category})
${componentInfo.description}

Dependencies: ${componentInfo.dependencies?.join(', ') || 'None'}
Status: ${isInstalled ? 'Installed' : 'Not installed'}`,
        },
      ],
    };
  }

  private async listInstalledComponents() {
    const uiComponentsPath = path.join(projectRoot, 'components', 'ui');

    if (!fs.existsSync(uiComponentsPath)) {
      return {
        content: [
          {
            type: 'text',
            text: 'No components directory found. Run init_shadcn first.',
          },
        ],
      };
    }

    const files = fs.readdirSync(uiComponentsPath);
    const componentFiles = files.filter(file => file.endsWith('.tsx'));

    if (componentFiles.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: 'No shadcn/ui components are currently installed.',
          },
        ],
      };
    }

    const installedComponents = componentFiles
      .map(file => file.replace('.tsx', ''))
      .join(', ');

    return {
      content: [
        {
          type: 'text',
          text: `Installed components (${componentFiles.length}):\n${installedComponents}`,
        },
      ],
    };
  }

  private async updateComponents() {
    try {
      // Get list of installed components
      const uiComponentsPath = path.join(projectRoot, 'components', 'ui');
      if (!fs.existsSync(uiComponentsPath)) {
        throw new Error('No components directory found. Run init_shadcn first.');
      }

      const files = fs.readdirSync(uiComponentsPath);
      const componentFiles = files.filter(file => file.endsWith('.tsx'));

      if (componentFiles.length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: 'No components to update.',
            },
          ],
        };
      }

      const components = componentFiles.map(file => file.replace('.tsx', ''));
      const command = `npx shadcn@latest add ${components.join(' ')} --overwrite`;

      const output = execSync(command, {
        cwd: projectRoot,
        encoding: 'utf8',
        stdio: 'pipe',
      });

      return {
        content: [
          {
            type: 'text',
            text: `Successfully updated components:\n\n${output}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to update components: ${error}`);
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Shadcn MCP server running on stdio');
  }
}

// Start the server
const server = new ShadcnMCPServer();
server.run().catch(console.error);
