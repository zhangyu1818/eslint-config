// @ts-expect-error - no types
import * as eslintPluginComments from 'eslint-plugin-eslint-comments'

import { interopDefault } from '../utils'

import type { FlatESLintConfig, RulesOverrides } from '../types'

const pluginComments = interopDefault(eslintPluginComments)

export function comments(overrides: RulesOverrides = {}): FlatESLintConfig[] {
  return [
    {
      plugins: {
        'eslint-comments': pluginComments,
      },
      rules: {
        'eslint-comments/no-aggregating-enable': 'error',
        'eslint-comments/no-duplicate-disable': 'error',
        'eslint-comments/no-unlimited-disable': 'error',
        'eslint-comments/no-unused-enable': 'error',
        ...overrides,
      },
    },
  ]
}
