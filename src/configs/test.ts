import * as eslintPluginVitest from '@vitest/eslint-plugin'
// @ts-expect-error - no types
import * as eslintPluginNoOnlyTests from 'eslint-plugin-no-only-tests'

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
        'no-only-tests': pluginNoOnlyTests,
        vitest: pluginVitest,
      },
      rules: {
        'node/prefer-global/process': 'off',

        'no-only-tests/no-only-tests': 'error',
        ...pluginVitest.configs.recommended.rules,
        ...overrides,
      },
      settings: {
        vitest: {
          typecheck: true,
        },
      },
    },
  ]
}
