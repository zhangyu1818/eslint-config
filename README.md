# @zhangyu1818/eslint-config

> A powerful and highly customizable ESLint Flat Config with support for React, Next.js, TailwindCSS, TypeScript, and Prettier.

[![npm version](https://badge.fury.io/js/%40zhangyu1818%2Feslint-config.svg)](https://badge.fury.io/js/%40zhangyu1818%2Feslint-config)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Table of Contents

- [Features](#-features)
- [Requirements](#-requirements)
- [Quick Start](#-quick-start)
- [How It Works](#-how-it-works)
- [Default Presets](#-default-enabled-presets)
- [Auto-detected Presets](#-auto-detected-presets)
- [Available Presets](#-all-available-presets)
- [Configuration API](#-configuration-api)
- [Configuration Examples](#-configuration-examples)
- [Preset Options](#-preset-options-details)
- [File Patterns](#-file-matching-patterns)
- [Ignored Files](️-default-ignored-filesdirectories)
- [Running ESLint](#️-running-eslint)
- [Best Practices](#-best-practices)
- [Troubleshooting](#-common-issues--troubleshooting)
- [Included Plugins](#-included-eslint-plugins)
- [Acknowledgments](#-acknowledgments)
- [License](#-license)
- [Related Links](#-related-links)

---

## ✨ Features

- **Zero Configuration Setup** - Works out of the box with automatic dependency detection
- **ESLint 10 Flat Config** - Uses the latest flat configuration format
- **Rich Preset Support** - 15+ high-quality presets covering various tech stacks
- **Highly Customizable** - Flexible rule overrides and options configuration
- **Monorepo Friendly** - Native support for multi-package configurations
- **Prettier Integration** - Optional code formatting support
- **Automatic Code Sorting** - Smart sorting for imports, object keys, and more
- **Native TypeScript Support** - Complete TypeScript type checking with type-aware linting

---

## 📋 Requirements

Before using this configuration, ensure your environment meets these requirements:

| Dependency | Minimum Version   | Recommended Version |
| ---------- | ----------------- | ------------------- |
| ESLint     | ^10.0.0           | Latest              |
| Node.js    | ^20.19.0          | ^22.13.0 or ^24.0.0 |
| TypeScript | ^5.0.0 (optional) | ^5.9.0              |

---

## 🚀 Quick Start

### Installation

Choose your preferred package manager:

```bash
# pnpm (recommended)
pnpm add @zhangyu1818/eslint-config -D

# npm
npm install @zhangyu1818/eslint-config -D

# yarn
yarn add @zhangyu1818/eslint-config -D

# bun
bun add @zhangyu1818/eslint-config -D
```

### Basic Configuration

Create `eslint.config.js` or `eslint.config.mjs` in your project root:

```js
import { defineConfig } from '@zhangyu1818/eslint-config'

export default defineConfig()
```

**That's it!** The config package automatically detects your project dependencies and enables the appropriate rules.

### Add Lint Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

Run linter:

```bash
pnpm lint          # Check for issues
pnpm lint:fix      # Auto-fix issues
```

---

## 🔄 How It Works

This configuration package uses a smart detection system to provide the right setup for your project:

1. **Default Presets** - Core JavaScript/TypeScript rules are always enabled
2. **Auto-Detection** - Scans your `package.json` dependencies and automatically enables:
   - `typescript` preset when `typescript` is installed
   - `react` preset when `react` is installed
3. **Manual Override** - You can explicitly enable/disable any preset in your configuration
4. **Priority Order** - Manual settings take precedence over auto-detected values

Example: If you have `react` installed but want to disable React rules:

```js
export default defineConfig({
  presets: {
    react: false, // Explicitly disable despite being detected
  },
})
```

---

## 🎯 Default Enabled Presets

The following presets are enabled by default when using `defineConfig()`:

| Preset          | Description                                                   |
| --------------- | ------------------------------------------------------------- |
| `comments`      | ESLint comment rules and best practices                       |
| `ignores`       | Automatically ignores common build directories and lock files |
| `imports`       | Import/export statement standards and auto-sorting            |
| `javascript`    | JavaScript basic syntax and best practices                    |
| `jsonc`         | JSON/JSONC file formatting standards                          |
| `jsx`           | JSX syntax support                                            |
| `perfectionist` | Code sorting (imports, object keys, properties, etc.)         |
| `regexp`        | Regular expression best practices                             |
| `sort`          | package.json and tsconfig.json field sorting                  |
| `unicorn`       | Powerful rule set to improve code quality and readability     |

These presets provide a solid foundation for any JavaScript/TypeScript project.

---

## 🔍 Auto-detected Presets

The following presets are automatically enabled based on project dependencies:

| Preset       | Detection Condition           | Behavior                         |
| ------------ | ----------------------------- | -------------------------------- |
| `typescript` | `typescript` package detected | Enables type-aware linting rules |
| `react`      | `react` package detected      | Enables React-specific rules     |

**Note:** Auto-detected presets can be disabled by explicitly setting them to `false`.

---

## 📋 All Available Presets

### Core Rules

| Preset       | Description              | Plugin                                             |
| ------------ | ------------------------ | -------------------------------------------------- |
| `comments`   | ESLint comment rules     | @eslint-community/eslint-plugin-eslint-comments   |
| `imports`    | Import rules             | eslint-plugin-import, eslint-plugin-unused-imports |
| `javascript` | JavaScript rules         | eslint-plugin-unused-imports                       |
| `jsonc`      | JSON file rules          | eslint-plugin-jsonc                                |
| `node`       | Node.js rules            | eslint-plugin-n                                    |
| `regexp`     | Regular expression rules | eslint-plugin-regexp                               |
| `unicorn`    | Improve code quality     | eslint-plugin-unicorn                              |

### Code Quality

| Preset          | Description         | Plugin                      |
| --------------- | ------------------- | --------------------------- |
| `perfectionist` | Code sorting        | eslint-plugin-perfectionist |
| `sort`          | Config file sorting | Built-in implementation     |

### Framework Support

| Preset        | Description       | Plugin                                                                                              |
| ------------- | ----------------- | --------------------------------------------------------------------------------------------------- |
| `react`       | React rules       | eslint-plugin-react, eslint-plugin-react-hooks, eslint-plugin-react-refresh, eslint-plugin-jsx-a11y |
| `next`        | Next.js rules     | @next/eslint-plugin-next                                                                            |
| `test`        | Test rules        | @vitest/eslint-plugin, eslint-plugin-no-only-tests                                                  |
| `tailwindcss` | TailwindCSS rules | eslint-plugin-better-tailwindcss                                                                    |

### Tool Integration

| Preset     | Description          | Plugin                                         |
| ---------- | -------------------- | ---------------------------------------------- |
| `prettier` | Prettier integration | eslint-plugin-prettier, eslint-config-prettier |

### Utility Presets

| Preset       | Description               |
| ------------ | ------------------------- |
| `ignores`    | Ignore file configuration |
| `jsx`        | JSX syntax support        |
| `typescript` | TypeScript rules          |

---

## 🎨 Configuration API

### defineConfig Function Signature

```ts
function defineConfig(
  options?: Options,
  userConfigs?: FlatESLintConfig[],
): Promise<FlatESLintConfig[]>
```

**Parameters:**

- `options` - Configuration options for presets
- `userConfigs` - Optional array of custom ESLint flat configs to merge

**Returns:** Promise resolving to an array of ESLint flat config objects

### Options Interface

```ts
interface Options {
  presets?: Presets
}
```

### Presets Interface

```ts
interface Presets {
  comments?: boolean | PresetConfig
  ignores?: boolean
  imports?: boolean | PresetConfig
  javascript?: boolean | PresetConfig
  jsonc?: boolean | PresetConfig
  jsx?: boolean
  next?: boolean | PresetConfig
  node?: boolean | PresetConfig
  perfectionist?: boolean | PresetConfig
  prettier?: boolean | PresetConfig
  react?: boolean | PresetConfig<ReactOptions>
  regexp?: boolean | PresetConfig
  sort?: boolean
  tailwindcss?: boolean | PresetConfig<TailwindCSSOptions>
  test?: boolean | PresetConfig
  typescript?: boolean | PresetConfig<TypeScriptOptions>
  unicorn?: boolean | PresetConfig
}
```

### PresetConfig Interface

Each preset can accept a boolean value or a configuration object:

```ts
interface PresetConfig<TOptions = {}> {
  enabled?: boolean // Enable or disable, defaults to true
  options?: TOptions // Preset-specific options
  rules?: RulesOverrides // Rule overrides
}
```

**Usage Examples:**

```js
// Enable with default settings
react: true

// Disable
react: false

// Enable with custom options
react: {
  enabled: true,
  options: { a11y: false },
  rules: { 'react/no-array-index-key': 'off' }
}

// Enable with only options (enabled defaults to true)
react: {
  options: { version: '18.3' }
}

// Enable with only rule overrides
react: {
  rules: { 'react/prop-types': 'off' }
}
```

---

## 🔧 Configuration Examples

### 1. Minimal Configuration (Auto-detection)

Best for simple projects with standard dependencies.

```js
import { defineConfig } from '@zhangyu1818/eslint-config'

export default defineConfig()
```

### 2. React + TypeScript Project

Explicitly enable React and TypeScript rules.

```js
import { defineConfig } from '@zhangyu1818/eslint-config'

export default defineConfig({
  presets: {
    react: true,
    typescript: true,
  },
})
```

### 3. Next.js Project

Complete setup for Next.js applications.

```js
import { defineConfig } from '@zhangyu1818/eslint-config'

export default defineConfig({
  presets: {
    react: true,
    typescript: true,
    next: true,
  },
})
```

### 4. Enable Prettier

Add Prettier integration for code formatting.

```js
import { defineConfig } from '@zhangyu1818/eslint-config'

export default defineConfig({
  presets: {
    prettier: true, // Must be last in preset order
  },
})
```

### 5. Enable TailwindCSS

Configure TailwindCSS class validation with custom entry point.

```js
import { defineConfig } from '@zhangyu1818/eslint-config'

export default defineConfig({
  presets: {
    tailwindcss: {
      options: {
        entryPoint: './src/styles/globals.css',
      },
    },
  },
})
```

### 6. Enable Test Rules (Vitest)

Add rules for test files using Vitest.

```js
import { defineConfig } from '@zhangyu1818/eslint-config'

export default defineConfig({
  presets: {
    test: true,
  },
})
```

### 7. Enable Node.js Rules

For backend Node.js projects.

```js
import { defineConfig } from '@zhangyu1818/eslint-config'

export default defineConfig({
  presets: {
    node: true,
  },
})
```

### 8. Override Specific Rules

Customize rules for any preset.

```js
import { defineConfig } from '@zhangyu1818/eslint-config'

export default defineConfig({
  presets: {
    typescript: {
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
      },
    },
    react: {
      rules: {
        'react/no-array-index-key': 'off',
      },
    },
  },
})
```

### 9. Disable Specific Presets

Turn off default or auto-detected presets.

```js
import { defineConfig } from '@zhangyu1818/eslint-config'

export default defineConfig({
  presets: {
    perfectionist: false, // Disable code sorting
    unicorn: false, // Disable unicorn rules
  },
})
```

### 10. Custom TypeScript Configuration

Configure type-aware linting with custom tsconfig.

```js
import { defineConfig } from '@zhangyu1818/eslint-config'

export default defineConfig({
  presets: {
    typescript: {
      options: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
})
```

### 11. Monorepo Multi-package Configuration

Configure TypeScript and TailwindCSS for different packages in a monorepo.

```js
import { defineConfig } from '@zhangyu1818/eslint-config'

export default defineConfig({
  presets: {
    typescript: {
      options: {
        packages: [
          {
            files: ['packages/web/**/*.ts', 'packages/web/**/*.tsx'],
            project: './packages/web/tsconfig.json',
            tsconfigRootDir: './packages/web',
          },
          {
            files: ['packages/server/**/*.ts'],
            project: './packages/server/tsconfig.json',
            tsconfigRootDir: './packages/server',
          },
        ],
      },
    },
    tailwindcss: {
      options: {
        packages: [
          {
            files: ['packages/web/**/*.tsx'],
            entryPoint: './packages/web/src/styles/globals.css',
          },
        ],
      },
    },
  },
})
```

### 12. Add Custom Configurations

Merge additional ESLint configurations.

```js
import { defineConfig } from '@zhangyu1818/eslint-config'

export default defineConfig(
  {
    presets: {
      typescript: true,
      react: true,
    },
  },
  [
    // Custom configuration array
    {
      files: ['**/*.config.ts'],
      rules: {
        'no-console': 'off',
      },
    },
    {
      ignores: ['custom-ignore-folder/**'],
    },
  ],
)
```

### 13. Complete Next.js + TailwindCSS + Prettier Configuration

Full-featured setup for Next.js projects.

```js
import { defineConfig } from '@zhangyu1818/eslint-config'

export default defineConfig({
  presets: {
    // Automatically enabled (no need to specify)
    // comments, ignores, imports, javascript, jsonc, jsx
    // perfectionist, regexp, sort, unicorn

    // Auto-detected (no need to specify if installed)
    // typescript, react

    // Manually enabled
    next: true,
    prettier: true,
    tailwindcss: {
      options: {
        entryPoint: './src/app/globals.css',
      },
    },
    test: true,
  },
})
```

### 14. Disable React Accessibility Rules

Disable specific React features.

```js
import { defineConfig } from '@zhangyu1818/eslint-config'

export default defineConfig({
  presets: {
    react: {
      options: {
        a11y: false, // Disable accessibility rules
      },
    },
  },
})
```

### 15. Custom File-specific Rules

Apply different rules to specific file patterns.

```js
import { defineConfig } from '@zhangyu1818/eslint-config'

export default defineConfig(
  {
    presets: {
      typescript: true,
      react: true,
    },
  },
  [
    // Allow console in test files
    {
      files: ['**/*.test.ts', '**/*.test.tsx'],
      rules: {
        'no-console': 'off',
      },
    },
    // Stricter rules for production code
    {
      files: ['src/**/*.ts', 'src/**/*.tsx'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'error',
      },
    },
  ],
)
```

---

## ⚙️ Preset Options Details

### TypeScript Options

Configure TypeScript type-aware linting and multi-package support.

```ts
interface TypeScriptOptions {
  project?: boolean | string | string[] // tsconfig path(s), defaults to true (auto-detect)
  tsconfigRootDir?: string // tsconfig root directory, defaults to process.cwd()
  packages?: TypeScriptPackageConfig[] // Multi-package configuration (monorepo)
}

interface TypeScriptPackageConfig {
  files: string[] // File matching patterns (required)
  project?: boolean | string | string[] // tsconfig path for this package
  tsconfigRootDir?: string // Root directory for this package
}
```

**Example:**

```js
typescript: {
  options: {
    project: './tsconfig.json',
    tsconfigRootDir: import.meta.dirname,
  }
}
```

**Important:** For type-aware linting, ensure your `tsconfig.json` includes all files to be linted.

### React Options

Configure React-specific behavior and framework detection.

```ts
interface ReactOptions {
  a11y?: boolean // Accessibility rules, defaults to true
  version?: string // React version, defaults to 'detect'
  framework?: ReactFrameworkOptions // Framework-specific settings
}

interface ReactFrameworkOptions {
  next?: boolean // Auto-detect Next.js (deprecated, use 'next' preset)
  vite?: boolean // Auto-detect Vite
}
```

**Example:**

```js
react: {
  options: {
    a11y: true,
    version: '18.3',
  }
}
```

### TailwindCSS Options

Configure TailwindCSS class validation for multiple packages.

```ts
interface TailwindCSSOptions {
  entryPoint?: string // CSS entry file, defaults to `${cwd}/src/app/globals.css`
  tailwindConfig?: string // Tailwind config file path
  packages?: TailwindCSSPackageConfig[] // Multi-package configuration
}

interface TailwindCSSPackageConfig {
  files: string[] // File matching patterns (required)
  entryPoint: string // CSS entry file (required)
  tailwindConfig?: string // Tailwind config for this package
}
```

**Example:**

```js
tailwindcss: {
  options: {
    entryPoint: './src/styles/globals.css',
    tailwindConfig: './tailwind.config.js',
  }
}
```

---

## 📁 File Matching Patterns

### JavaScript/TypeScript

```ts
const GLOB_JS = '**/*.?([cm])js' // .js, .cjs, .mjs
const GLOB_JSX = '**/*.?([cm])jsx' // .jsx, .cjsx, .mjsx
const GLOB_TS = '**/*.?([cm])ts' // .ts, .cts, .mts
const GLOB_TSX = '**/*.?([cm])tsx' // .tsx, .ctsx, .mtsx
```

**Supports:**

- CommonJS (`.cjs`, `.cts`)
- ECMAScript Modules (`.mjs`, `.mts`)
- Standard extensions (`.js`, `.ts`)

### JSON Files

```ts
const GLOB_JSON = '**/*.json'
const GLOB_JSON5 = '**/*.json5'
const GLOB_JSONC = '**/*.jsonc'
```

### Test Files

```ts
const GLOB_TESTS = [
  '**/__tests__/**/*.?([cm])[jt]s?(x)',
  '**/*.spec.?([cm])[jt]s?(x)',
  '**/*.test.?([cm])[jt]s?(x)',
  '**/*.bench.?([cm])[jt]s?(x)',
  '**/*.benchmark.?([cm])[jt]s?(x)',
]
```

**Matches:**

- `__tests__/` directory
- `*.spec.js`, `*.spec.ts`, `*.spec.jsx`, `*.spec.tsx`
- `*.test.js`, `*.test.ts`, `*.test.jsx`, `*.test.tsx`
- `*.bench.js`, `*.bench.ts`, etc.
- `*.benchmark.js`, `*.benchmark.ts`, etc.

---

## 🚫 Default Ignored Files/Directories

The following files and directories are automatically ignored to improve performance:

```ts
const GLOB_EXCLUDE = [
  // Dependencies
  '**/node_modules',
  '**/package-lock.json',
  '**/yarn.lock',
  '**/pnpm-lock.yaml',
  '**/bun.lockb',

  // Build outputs
  '**/dist',
  '**/output',
  '**/.output',

  // Framework outputs
  '**/.next',
  '**/.nuxt',
  '**/.vercel',

  // Testing/Coverage
  '**/coverage',
  '**/__snapshots__',

  // Cache/Temp directories
  '**/temp',
  '**/.temp',
  '**/tmp',
  '**/.tmp',
  '**/.cache',
  '**/.vitepress/cache',
  '**/.vite-inspect',

  // Tool directories
  '**/.idea',
  '**/.history',
  '**/.changeset',
  '**/.yarn',

  // Documentation
  '**/CHANGELOG*.md',
  '**/LICENSE*',

  // Minified files
  '**/*.min.*',

  // Generated type files
  '**/auto-import?(s).d.ts',
  '**/components.d.ts',
]
```

**Note:** You can add custom ignore patterns using the `ignores` option in your configuration.

---

## 🛠️ Running ESLint

### Basic Commands

```bash
# Check all files
npx eslint .

# Auto-fix fixable issues
npx eslint . --fix

# Check specific files
npx eslint src/**/*.ts

# Check specific directory
npx eslint src/

# Show verbose output (useful for debugging)
npx eslint . --debug

# Show rule details
npx eslint . --print-config

# Use cache for faster runs
npx eslint . --cache
```

### Recommended package.json Scripts

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "lint:debug": "eslint . --debug",
    "lint:cache": "eslint . --cache"
  }
}
```

### CI/CD Integration

For CI/CD pipelines, use:

```json
{
  "scripts": {
    "lint:ci": "eslint . --max-warnings=0"
  }
}
```

This ensures the build fails if there are any linting warnings.

---

## 💡 Best Practices

### 1. TypeScript Configuration

Ensure `tsconfig.json` includes all files that need to be checked:

```json
{
  "include": ["src/**/*", "eslint.config.ts"],
  "exclude": ["node_modules", "dist"]
}
```

**Tip:** For type-aware linting, use the `project` option in TypeScript preset.

### 2. TailwindCSS Configuration

Specify the correct CSS entry file path to enable class validation:

```js
export default defineConfig({
  presets: {
    tailwindcss: {
      options: {
        entryPoint: './src/index.css',
      },
    },
  },
})
```

**Important:** The entry point must be the file where Tailwind directives are imported.

### 3. Monorepo Configuration

Use the `packages` option to specify different configurations for different packages:

```js
export default defineConfig({
  presets: {
    typescript: {
      options: {
        packages: [
          {
            files: ['apps/web/**/*.ts'],
            project: './apps/web/tsconfig.json',
            tsconfigRootDir: './apps/web',
          },
          {
            files: ['packages/ui/**/*.ts'],
            project: './packages/ui/tsconfig.json',
            tsconfigRootDir: './packages/ui',
          },
        ],
      },
    },
  },
})
```

### 4. Prettier Configuration

Configure Prettier options using a separate `.prettierrc` or `prettier.config.js` file:

```js
// .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

**Important:** Always load the `prettier` preset last to ensure it overrides conflicting ESLint rules.

### 5. Performance Optimization

For large codebases, consider these optimizations:

```js
export default defineConfig({
  presets: {
    typescript: {
      options: {
        // Disable type-aware linting for faster runs
        project: false,
      },
    },
  },
})
```

### 6. Rule Organization

Keep rule overrides organized by preset:

```js
export default defineConfig({
  presets: {
    typescript: {
      rules: {
        // TypeScript-specific rules
      },
    },
    react: {
      rules: {
        // React-specific rules
      },
    },
  },
})
```

### 7. File-specific Configurations

Apply different rules to different file types:

```js
export default defineConfig({}, [
  // Test files
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    rules: {
      'no-console': 'off',
    },
  },
  // Config files
  {
    files: ['*.config.js', '*.config.ts'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
])
```

---

## ❓ Common Issues & Troubleshooting

### 1. TypeScript Parsing Errors

**Problem:** ESLint reports TypeScript parsing errors or type errors

**Symptoms:**

```
error  Parsing error: Property 'foo' does not exist on type 'Bar'
```

**Solutions:**

1. Ensure `tsconfig.json` includes all files to be linted:

   ```json
   {
     "include": ["src/**/*", "eslint.config.ts"]
   }
   ```

2. Configure `tsconfigRootDir` correctly:

   ```js
   typescript: {
     options: {
       tsconfigRootDir: import.meta.dirname,
     },
   }
   ```

3. Disable type-aware linting for faster performance (if not needed):

   ```js
   typescript: {
     options: {
       project: false,
     },
   }
   ```

### 2. TailwindCSS Entry File Not Found

**Problem:** Cannot find TailwindCSS entry file

**Symptoms:**

```
error  Tailwind CSS config file not found
```

**Solution:** Specify the correct CSS entry file path:

```js
tailwindcss: {
  options: {
    entryPoint: './src/app/globals.css',  // Adjust path to your project
  },
}
```

**Note:** The entry point must be the file where `@tailwind` directives are imported.

### 3. Monorepo Package Parsing Failure

**Problem:** TypeScript parsing fails for sub-packages in a monorepo

**Symptoms:**

```
error  Cannot find module '@/components/Button'
```

**Solution:** Use `typescript.options.packages` to configure each package individually:

```js
typescript: {
  options: {
    packages: [
      {
        files: ['packages/web/**/*.ts'],
        project: './packages/web/tsconfig.json',
        tsconfigRootDir: './packages/web',
      },
    ],
  },
}
```

### 4. Prettier Rule Conflicts

**Problem:** ESLint and Prettier rules conflict

**Symptoms:** Inconsistent formatting or duplicate errors

**Solution:** Ensure the `prettier` preset is loaded last. The `eslint-config-prettier` included in this preset automatically disables conflicting rules.

```js
export default defineConfig({
  presets: {
    // Other presets...
    prettier: true, // Load last
  },
})
```

### 5. Auto-imports Not Recognized

**Problem:** ESLint reports "unused import" for auto-imported variables

**Symptoms:**

```
error  'ref' is defined but never used
```

**Solution:** Add auto-import type declaration files to the ignore list or configure the parser to recognize them.

### 6. Performance Issues on Large Projects

**Problem:** ESLint runs slowly on large codebases

**Solutions:**

1. Use ESLint cache:

   ```bash
   eslint . --cache
   ```

2. Disable type-aware linting (if not critical):

   ```js
   typescript: {
     options: {
       project: false,
     },
   }
   ```

3. Use `.eslintignore` to exclude large generated files:

   ```text
   # .eslintignore
   dist/
   node_modules/
   coverage/
   ```

### 7. Rules Not Applying to Specific Files

**Problem:** Rules configured in `defineConfig()` don't apply to certain files

**Solution:** Use file-specific configurations:

```js
export default defineConfig({}, [
  {
    files: ['src/**/*'],
    rules: {
      // Rules for src files
    },
  },
])
```

### 8. Flat Config Migration Issues

**Problem:** Errors while adopting flat config

**Solution:** Ensure you're using ESLint 10+ and the correct config file name:

- `eslint.config.js` (CommonJS)
- `eslint.config.mjs` (ES Modules - recommended)
- `eslint.config.ts` (TypeScript)

---

## 📊 Included ESLint Plugins

| Preset          | Plugin(s)                                                                                           |
| --------------- | --------------------------------------------------------------------------------------------------- |
| `comments`      | @eslint-community/eslint-plugin-eslint-comments                                                     |
| `imports`       | eslint-plugin-import, eslint-plugin-unused-imports                                                  |
| `javascript`    | eslint-plugin-unused-imports                                                                        |
| `jsonc`         | eslint-plugin-jsonc                                                                                 |
| `next`          | @next/eslint-plugin-next                                                                            |
| `node`          | eslint-plugin-n                                                                                     |
| `perfectionist` | eslint-plugin-perfectionist                                                                         |
| `prettier`      | eslint-plugin-prettier, eslint-config-prettier                                                      |
| `react`         | eslint-plugin-react, eslint-plugin-react-hooks, eslint-plugin-react-refresh, eslint-plugin-jsx-a11y |
| `regexp`        | eslint-plugin-regexp                                                                                |
| `tailwindcss`   | eslint-plugin-better-tailwindcss                                                                    |
| `test`          | @vitest/eslint-plugin, eslint-plugin-no-only-tests                                                  |
| `typescript`    | typescript-eslint                                                                                   |
| `unicorn`       | eslint-plugin-unicorn                                                                               |

---

## 🤝 Acknowledgments

This project is heavily inspired by [Anthony Fu](https://github.com/antfu)'s [@antfu/eslint-config](https://github.com/antfu/eslint-config). Thanks for his outstanding contributions to the open-source community.

---

## 📄 License

[MIT](LICENSE) © zhangyu1818

---

## 🔗 Related Links

- [ESLint Official Documentation](https://eslint.org/)
- [ESLint Flat Config Guide](https://eslint.org/docs/latest/use/configure/configuration-files-new)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [Prettier Documentation](https://prettier.io/)
- [Next.js ESLint Configuration](https://nextjs.org/docs/app/building-your-application/configuring/eslint)
- [TailwindCSS ESLint Plugin](https://github.com/sveltejs/eslint-plugin-svelte/tree/main/packages/eslint-plugin-better-tailwindcss)

---

**Made with ❤️ by [@zhangyu1818](https://github.com/zhangyu1818)**
