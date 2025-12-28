import path from 'node:path'

import { ESLint } from 'eslint'
import { describe, expect, it } from 'vitest'

import { defineConfig } from '../src/index'

const FIXTURE_DIR = path.resolve(__dirname, 'all-presets-fixture')

describe('All Presets', () => {
  it('should load and run all presets without errors', async () => {
    // Enable ALL presets
    const config = await defineConfig({
      presets: {
        comments: true,
        ignores: true,
        imports: true,
        javascript: true,
        jsonc: true,
        jsx: true,
        next: true,
        node: true,
        perfectionist: true,
        prettier: true,
        regexp: true,
        sort: true,
        tailwindcss: true,
        test: true,
        unicorn: true,
        react: {
          options: {
            version: '18.3',
          },
        },
        typescript: {
          options: {
            project: path.join(FIXTURE_DIR, 'tsconfig.json'),
            tsconfigRootDir: FIXTURE_DIR,
          },
        },
      },
    })

    // Verify all expected plugins are loaded
    const allPlugins = new Set<string>()
    for (const c of config) {
      if (c.plugins) {
        for (const plugin of Object.keys(c.plugins)) {
          allPlugins.add(plugin)
        }
      }
    }

    // Check that key plugins are present
    const expectedPlugins = [
      '@typescript-eslint',
      'react',
      'react-hooks',
      'react-refresh',
      'jsx-a11y',
      'unicorn',
      'perfectionist',
      '@next/next',
      'better-tailwindcss',
      'vitest',
      'eslint-comments',
      'import',
      'node',
      'jsonc',
      'regexp',
      'prettier',
    ]

    for (const plugin of expectedPlugins) {
      expect(
        allPlugins.has(plugin),
        `Plugin "${plugin}" should be loaded`,
      ).toBe(true)
    }

    // Create ESLint instance and lint real files
    const eslint = new ESLint({
      cwd: FIXTURE_DIR,
      overrideConfig: config,
      overrideConfigFile: true,
    })

    // Lint real files - this validates all rule configurations are valid
    const results = await eslint.lintFiles([
      path.join(FIXTURE_DIR, 'test-component.tsx'),
      path.join(FIXTURE_DIR, 'package.json'),
    ])

    // Should complete without throwing
    expect(results).toBeDefined()
    expect(Array.isArray(results)).toBe(true)
    expect(results.length).toBeGreaterThan(0)

    // Check that there are no fatal errors (which would indicate config issues)
    const fatalErrors = results.flatMap((r) =>
      r.messages.filter((m) => m.fatal === true),
    )
    expect(
      fatalErrors,
      `Should have no fatal config errors: ${JSON.stringify(fatalErrors)}`,
    ).toHaveLength(0)
  })
})
