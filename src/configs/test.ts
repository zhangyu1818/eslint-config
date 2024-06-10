// @ts-expect-error - no types
import * as eslintPluginNoOnlyTests from 'eslint-plugin-no-only-tests'
import * as eslintPluginVitest from 'eslint-plugin-vitest'

import { GLOB_TESTS } from '../globs'
import { interopDefault } from '../utils'

import type { FlatESLintConfig, RulesOverrides } from '../types'

const pluginVitest = interopDefault(eslintPluginVitest)
const pluginNoOnlyTests = interopDefault(eslintPluginNoOnlyTests)

export function test(overrides: RulesOverrides = {}): FlatESLintConfig[] {
  return [
    {
      files: GLOB_TESTS,
      plugins: {
        test: pluginVitest,
      },
      rules: {
        'node/prefer-global/process': 'off',

        'test/consistent-test-it': [
          'error',
          { fn: 'it', withinDescribe: 'it' },
        ],
        'test/no-identical-title': 'error',
        'test/no-import-node-test': 'error',
        'test/no-only-tests': 'error',
        'test/prefer-hooks-in-order': 'error',
        'test/prefer-lowercase-title': 'error',

        ...pluginNoOnlyTests.rules,

        ...overrides,
      },
    },
  ]
}
