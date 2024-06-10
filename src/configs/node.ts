import * as eslintPluginNode from 'eslint-plugin-n'

import { interopDefault } from '../utils'

import type { FlatESLintConfig, RulesOverrides } from '../types'

const pluginNode = interopDefault(eslintPluginNode)

export function node(overrides: RulesOverrides = {}): FlatESLintConfig[] {
  return [
    {
      plugins: {
        node: pluginNode,
      },
      rules: {
        'node/handle-callback-err': ['error', '^(err|error)$'],
        'node/hashbang': 'error',
        'node/no-deprecated-api': 'error',
        'node/no-exports-assign': 'error',
        'node/no-new-require': 'error',
        'node/no-path-concat': 'error',
        'node/prefer-global/buffer': ['error', 'never'],

        'node/prefer-global/process': ['error', 'always'],
        'node/process-exit-as-throw': 'error',

        ...overrides,
      },
    },
  ]
}
