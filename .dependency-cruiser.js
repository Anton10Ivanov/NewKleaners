export default {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      comment:
        'This dependency is part of a circular relationship. You might want to revise your solution (i.e. use dependency inversion, make sure the modules have a single responsibility) ',
      from: {},
      to: {
        circular: true,
      },
    },
    {
      name: 'no-orphans',
      comment:
        "This is an orphan module - it's likely not used (anymore?). Either use it or remove it. If it's logical this module should not be used, consider adding it to your dependency rules section in the dependency-cruiser configuration. By default this rule breaks when there is more than one orphan, allowing you to see all of them at once.",
      severity: 'warn',
      from: {
        orphan: true,
        pathNot: [
          '(^|/)(coverage|test|spec|__tests__|tests|__mocks__|__stories__|stories)/',
          '\\.(test|spec)\\.(js|jsx|ts|tsx)$',
          '\\.(stories)\\.(js|jsx|ts|tsx)$',
          '\\.(config|setup)\\.(js|ts)$',
        ],
      },
      to: {},
    },
    {
      name: 'no-deprecated-core',
      comment:
        "A module depends on a node core module that has been deprecated. Find an alternative - these are bound to exist - node doesn't deprecate lightly.",
      severity: 'warn',
      from: {},
      to: {
        dependencyTypes: ['core'],
        path: ['^(punycode|domain|constants|sys|_linklist|_stream_wrap)$'],
      },
    },
    {
      name: 'not-to-deprecated',
      comment:
        'This module uses a (version of an) npm module that has been deprecated. Either upgrade to a later version of that module, or find an alternative. Deprecated modules are a security risk.',
      severity: 'warn',
      from: {},
      to: {
        dependencyTypes: ['deprecated'],
      },
    },
    {
      name: 'no-non-package-json',
      severity: 'error',
      comment:
        "This module depends on an npm package that isn't in the 'dependencies' section of your package.json. That's problematic as the package either (1) won't be available on live (2) will be available but only because some other module brought it in - and that module might not be there anymore. Add the package to the dependencies in your package.json.",
      from: {},
      to: {
        dependencyTypes: ['npm-no-pkg', 'npm-unknown'],
      },
    },
    {
      name: 'no-restricted-paths',
      severity: 'error',
      comment: 'This module depends on a module that is restricted from being used.',
      from: {},
      to: {
        path: [
          '^src/(.*)\\.(test|spec)\\.(js|jsx|ts|tsx)$',
          '^src/(.*)\\.stories\\.(js|jsx|ts|tsx)$',
        ],
        pathNot: [
          '^src/(.*)\\.(test|spec)\\.(js|jsx|ts|tsx)$',
          '^src/(.*)\\.stories\\.(js|jsx|ts|tsx)$',
        ],
      },
    },
  ],
  options: {
    doNotFollow: {
      path: 'node_modules',
    },
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: './tsconfig.json',
    },
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default'],
    },
    reporterOptions: {
      dot: {
        collapsePattern: 'node_modules/[^/]+',
      },
      archi: {
        collapsePattern: 'node_modules/[^/]+',
      },
      text: {
        highlightFocused: true,
      },
    },
  },
};
