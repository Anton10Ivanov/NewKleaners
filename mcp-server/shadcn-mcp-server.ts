#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  GetPromptRequestSchema,
  ListPromptsRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
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
          resources: {},
          prompts: {},
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
    this.server.setRequestHandler(CallToolRequestSchema, async request => {
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

    // List available resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      return {
        resources: [
          {
            uri: 'shadcn://components.json',
            name: 'Components Configuration',
            description: 'shadcn/ui components configuration file',
            mimeType: 'application/json',
          },
          {
            uri: 'shadcn://tailwind.config',
            name: 'Tailwind Configuration',
            description: 'Tailwind CSS configuration for shadcn/ui',
            mimeType: 'application/javascript',
          },
          {
            uri: 'shadcn://css-variables',
            name: 'CSS Variables',
            description: 'CSS variables for shadcn/ui theming',
            mimeType: 'text/css',
          },
          {
            uri: 'shadcn://component-template',
            name: 'Component Template',
            description: 'Template for creating new shadcn/ui components',
            mimeType: 'text/plain',
          },
          {
            uri: 'shadcn://usage-examples',
            name: 'Usage Examples',
            description: 'Code examples for using shadcn/ui components',
            mimeType: 'text/plain',
          },
        ],
      };
    });

    // Read specific resources
    this.server.setRequestHandler(ReadResourceRequestSchema, async request => {
      const { uri } = request.params;

      try {
        switch (uri) {
          case 'shadcn://components.json':
            return await this.getComponentsJson();
          case 'shadcn://tailwind.config':
            return await this.getTailwindConfig();
          case 'shadcn://css-variables':
            return await this.getCssVariables();
          case 'shadcn://component-template':
            return await this.getComponentTemplate();
          case 'shadcn://usage-examples':
            return await this.getUsageExamples();
          default:
            throw new Error(`Unknown resource: ${uri}`);
        }
      } catch (error) {
        return {
          contents: [
            {
              uri,
              mimeType: 'text/plain',
              text: `Error: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    });

    // List available prompts
    this.server.setRequestHandler(ListPromptsRequestSchema, async () => {
      return {
        prompts: [
          {
            name: 'create-component',
            description: 'Generate a new shadcn/ui component with proper structure and styling',
            arguments: [
              {
                name: 'componentName',
                description: 'Name of the component to create',
                required: true,
              },
              {
                name: 'componentType',
                description: 'Type of component (form, layout, overlay, etc.)',
                required: false,
              },
              {
                name: 'includeVariants',
                description: 'Whether to include variant styling',
                required: false,
              },
            ],
          },
          {
            name: 'component-usage',
            description: 'Generate usage examples for a specific shadcn/ui component',
            arguments: [
              {
                name: 'componentName',
                description: 'Name of the component to generate examples for',
                required: true,
              },
              {
                name: 'useCase',
                description: 'Specific use case or scenario',
                required: false,
              },
            ],
          },
          {
            name: 'theme-customization',
            description: 'Generate theme customization code for shadcn/ui',
            arguments: [
              {
                name: 'colorScheme',
                description: 'Color scheme to implement',
                required: false,
              },
              {
                name: 'styleVariant',
                description: 'Style variant (default, new-york)',
                required: false,
              },
            ],
          },
          {
            name: 'component-composition',
            description:
              'Generate complex component compositions using multiple shadcn/ui components',
            arguments: [
              {
                name: 'components',
                description: 'List of components to compose',
                required: true,
              },
              {
                name: 'purpose',
                description: 'Purpose of the composition (form, dashboard, etc.)',
                required: false,
              },
            ],
          },
        ],
      };
    });

    // Get specific prompts
    this.server.setRequestHandler(GetPromptRequestSchema, async request => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'create-component':
            return await this.getCreateComponentPrompt(args as any);
          case 'component-usage':
            return await this.getComponentUsagePrompt(args as any);
          case 'theme-customization':
            return await this.getThemeCustomizationPrompt(args as any);
          case 'component-composition':
            return await this.getComponentCompositionPrompt(args as any);
          default:
            throw new Error(`Unknown prompt: ${name}`);
        }
      } catch (error) {
        return {
          description: `Error: ${error instanceof Error ? error.message : String(error)}`,
          messages: [
            {
              role: 'user',
              content: {
                type: 'text',
                text: `Error generating prompt: ${error}`,
              },
            },
          ],
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
        description:
          'Extends the Dialog component to display content that complements the main content',
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
        description:
          'A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked',
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
      filteredComponents = filteredComponents.filter(comp => comp.category === args.category);
    }

    if (args.search) {
      const searchTerm = args.search.toLowerCase();
      filteredComponents = filteredComponents.filter(
        comp =>
          comp.name.toLowerCase().includes(searchTerm) ||
          comp.description.toLowerCase().includes(searchTerm),
      );
    }

    const componentList = filteredComponents
      .map(
        comp =>
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
    const componentInfo = this.components.find(comp => comp.name === component);
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
        // Note: shadcn doesn't track installed components in components.json
        // This is just for cleanup if needed
        // const componentsJson = JSON.parse(fs.readFileSync(componentsJsonPath, 'utf8'));
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

  private async initShadcn(args: { style?: string; baseColor?: string; cssVariables?: boolean }) {
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

    const componentInfo = this.components.find(comp => comp.name === component);
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

    const installedComponents = componentFiles.map(file => file.replace('.tsx', '')).join(', ');

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

  // Resource methods
  private async getComponentsJson() {
    const componentsJsonPath = path.join(projectRoot, 'components.json');
    if (fs.existsSync(componentsJsonPath)) {
      const content = fs.readFileSync(componentsJsonPath, 'utf8');
      return {
        contents: [
          {
            uri: 'shadcn://components.json',
            mimeType: 'application/json',
            text: content,
          },
        ],
      };
    } else {
      return {
        contents: [
          {
            uri: 'shadcn://components.json',
            mimeType: 'application/json',
            text: JSON.stringify(
              {
                $schema: 'https://ui.shadcn.com/schema.json',
                style: 'default',
                rsc: false,
                tsx: true,
                tailwind: {
                  config: 'tailwind.config.ts',
                  css: 'app/globals.css',
                  baseColor: 'slate',
                  cssVariables: true,
                  prefix: '',
                },
                aliases: {
                  components: '@/components',
                  utils: '@/lib/utils',
                },
              },
              null,
              2,
            ),
          },
        ],
      };
    }
  }

  private async getTailwindConfig() {
    const tailwindConfigPath = path.join(projectRoot, 'tailwind.config.ts');
    if (fs.existsSync(tailwindConfigPath)) {
      const content = fs.readFileSync(tailwindConfigPath, 'utf8');
      return {
        contents: [
          {
            uri: 'shadcn://tailwind.config',
            mimeType: 'application/javascript',
            text: content,
          },
        ],
      };
    } else {
      return {
        contents: [
          {
            uri: 'shadcn://tailwind.config',
            mimeType: 'application/javascript',
            text: `import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;`,
          },
        ],
      };
    }
  }

  private async getCssVariables() {
    return {
      contents: [
        {
          uri: 'shadcn://css-variables',
          mimeType: 'text/css',
          text: `@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`,
        },
      ],
    };
  }

  private async getComponentTemplate() {
    return {
      contents: [
        {
          uri: 'shadcn://component-template',
          mimeType: 'text/plain',
          text: `import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const componentVariants = cva(
  'base-classes',
  {
    variants: {
      variant: {
        default: 'default-variant-classes',
        secondary: 'secondary-variant-classes',
        destructive: 'destructive-variant-classes',
        outline: 'outline-variant-classes',
      },
      size: {
        default: 'default-size-classes',
        sm: 'small-size-classes',
        lg: 'large-size-classes',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  // Add custom props here
}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(componentVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Component.displayName = 'Component';

export { Component, componentVariants };`,
        },
      ],
    };
  }

  private async getUsageExamples() {
    return {
      contents: [
        {
          uri: 'shadcn://usage-examples',
          mimeType: 'text/plain',
          text: `# shadcn/ui Usage Examples

## Button Component
\`\`\`tsx
import { Button } from '@/components/ui/button';

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Ghost</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>

// With icons
<Button>
  <Plus className="mr-2 h-4 w-4" />
  Add Item
</Button>
\`\`\`

## Card Component
\`\`\`tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
</Card>
\`\`\`

## Form Components
\`\`\`tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

<form className="space-y-4">
  <div>
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="Enter your email" />
  </div>
  <Button type="submit">Submit</Button>
</form>
\`\`\`

## Dialog Component
\`\`\`tsx
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
\`\`\``,
        },
      ],
    };
  }

  // Prompt methods
  private async getCreateComponentPrompt(args: {
    componentName: string;
    componentType?: string;
    includeVariants?: boolean;
  }) {
    const { componentName, componentType = 'form', includeVariants = true } = args;

    return {
      description: `Generate a new shadcn/ui component called ${componentName}`,
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `Create a new shadcn/ui component called "${componentName}" for the ${componentType} category. ${includeVariants ? 'Include variant styling with different sizes and styles.' : 'Use basic styling without variants.'} Follow shadcn/ui conventions with proper TypeScript types, forwardRef, and class-variance-authority for styling.`,
          },
        },
      ],
    };
  }

  private async getComponentUsagePrompt(args: { componentName: string; useCase?: string }) {
    const { componentName, useCase = 'general' } = args;

    return {
      description: `Generate usage examples for ${componentName} component`,
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `Generate comprehensive usage examples for the shadcn/ui ${componentName} component. Show different variants, sizes, and use cases. Include code examples for ${useCase} scenarios. Make sure to include proper imports and demonstrate best practices.`,
          },
        },
      ],
    };
  }

  private async getThemeCustomizationPrompt(args: { colorScheme?: string; styleVariant?: string }) {
    const { colorScheme = 'default', styleVariant = 'default' } = args;

    return {
      description: `Generate theme customization for ${colorScheme} color scheme`,
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `Help me customize the shadcn/ui theme with a ${colorScheme} color scheme using the ${styleVariant} style variant. Provide CSS variables, Tailwind configuration updates, and component customization examples. Include both light and dark mode support.`,
          },
        },
      ],
    };
  }

  private async getComponentCompositionPrompt(args: { components: string; purpose?: string }) {
    const { components, purpose = 'general' } = args;

    return {
      description: `Generate component composition using ${components}`,
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `Create a complex component composition using these shadcn/ui components: ${components}. The composition should be for ${purpose} purposes. Show how to properly combine the components, handle state management, and create a cohesive user interface. Include proper TypeScript types and accessibility considerations.`,
          },
        },
      ],
    };
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
