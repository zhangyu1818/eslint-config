import * as eslintPluginJest from 'eslint-plugin-jest'
// @ts-expect-error - no types
import * as eslintPluginNoOnlyTests from 'eslint-plugin-no-only-tests'

import { GLOB_TESTS } from '../globs'
import { interopDefault } from '../utils'

import type { FlatESLintConfig, RulesOverrides } from '../types'

const pluginJest = interopDefault(eslintPluginJest)
const pluginNoOnlyTests = interopDefault(eslintPluginNoOnlyTests)

export function test(overrides: RulesOverrides = {}): FlatESLintConfig[] {
  return [
    {
      files: GLOB_TESTS,
      plugins: {
        jest: pluginJest,
      },
      rules: {
        'node/prefer-global/process': 'off',

        ...pluginNoOnlyTests.rules,
        ...pluginJest.configs['flat/recommended'].rules,
        ...overrides,
      },
    },
  ]
}
