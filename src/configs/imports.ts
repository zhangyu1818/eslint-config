import * as eslintPluginImports from 'eslint-plugin-import-x'

import { interopDefault } from '../utils'

import type { FlatESLintConfig, RulesOverrides } from '../types'

const pluginImports = interopDefault(eslintPluginImports)

export function imports(overrides: RulesOverrides): FlatESLintConfig[] {
  return [
    {
      plugins: {
        import: pluginImports,
      },
      rules: {
        'import/first': 'error',
        'import/newline-after-import': ['error', { count: 1 }],
        'import/no-duplicates': ['error', { 'prefer-inline': true }],
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',
        'import/no-self-import': 'error',
        'import/no-webpack-loader-syntax': 'error',
        ...overrides,
      },
    },
  ]
}
