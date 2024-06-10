// @ts-expect-error - no types
import * as eslintPluginUnicorn from 'eslint-plugin-unicorn'

import { interopDefault } from '../utils'

import type { FlatESLintConfig, RulesOverrides } from '../types'

const pluginUnicorn = interopDefault(eslintPluginUnicorn)

export function unicorn(overrides: RulesOverrides): FlatESLintConfig[] {
  return [
    {
      plugins: {
        unicorn: pluginUnicorn,
      },
      rules: {
        'unicorn/consistent-empty-array-spread': 'error',
        'unicorn/consistent-function-scoping': 'error',
        'unicorn/empty-brace-spaces': 'error',
        'unicorn/error-message': 'error',
        'unicorn/escape-case': 'error',
        'unicorn/explicit-length-check': [
          'error',
          {
            'non-zero': 'not-equal',
          },
        ],
        'unicorn/new-for-builtins': 'error',
        'unicorn/no-anonymous-default-export': 'error',
        'unicorn/no-await-expression-member': 'error',
        'unicorn/no-await-in-promise-methods': 'error',
        'unicorn/no-instanceof-array': 'error',
        'unicorn/no-new-array': 'error',
        'unicorn/no-new-buffer': 'error',
        'unicorn/no-useless-length-check': 'error',
        'unicorn/no-useless-spread': 'error',
        'unicorn/number-literal-case': 'error',
        'unicorn/prefer-dom-node-text-content': 'error',
        'unicorn/prefer-includes': 'error',
        'unicorn/prefer-modern-dom-apis': 'error',
        'unicorn/prefer-node-protocol': 'error',
        'unicorn/prefer-number-properties': 'error',
        'unicorn/prefer-query-selector': 'error',
        'unicorn/prefer-string-raw': 'error',
        'unicorn/prefer-string-starts-ends-with': 'error',
        'unicorn/prefer-type-error': 'error',
        'unicorn/throw-new-error': 'error',
        ...overrides,
      },
    },
  ]
}
