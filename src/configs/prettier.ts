import * as eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

import { interopDefault } from '../utils'

import type { FlatESLintConfig, RulesOverrides } from '../types'

const pluginPrettierRecommended = interopDefault(
  eslintPluginPrettierRecommended,
)

export function prettier(overrides: RulesOverrides): FlatESLintConfig[] {
  return [
    {
      ...pluginPrettierRecommended,
      rules: {
        ...pluginPrettierRecommended.rules,
        ...overrides,
      },
    },
  ]
}
