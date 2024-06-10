import * as eslintPluginRegexp from 'eslint-plugin-regexp'

import { interopDefault } from '../utils'

import type { FlatESLintConfig, RulesOverrides } from '../types'

const pluginRegexp = interopDefault(eslintPluginRegexp)

export function regexp(overrides: RulesOverrides = {}): FlatESLintConfig[] {
  return [
    {
      ...pluginRegexp.configs['flat/recommended'],
      rules: {
        ...pluginRegexp.configs['flat/recommended'].rules,
        ...overrides,
      },
    },
  ]
}
