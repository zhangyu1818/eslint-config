// @ts-expect-error - no types
import * as eslintPluginTailwindcss from 'eslint-plugin-tailwindcss'

import { GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX } from '../globs'
import { interopDefault } from '../utils'

import type { FlatESLintConfig, RulesOverrides } from '../types'

const pluginTailwindcss = interopDefault(eslintPluginTailwindcss)

export function tailwindcss(
  overrides: RulesOverrides = {},
): FlatESLintConfig[] {
  const option = {
    callees: ['classnames', 'clsx', 'ctl', 'cva', 'tv'],
    tags: ['tw'],
  }
  return [
    {
      files: [GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX],
      plugins: {
        tailwindcss: pluginTailwindcss,
      },
      rules: {
        'tailwindcss/classnames-order': ['error', option],
        'tailwindcss/enforces-negative-arbitrary-values': 'off',
        'tailwindcss/enforces-shorthand': ['error', option],
        'tailwindcss/no-arbitrary-value': 'off',
        'tailwindcss/no-contradicting-classname': ['error', option],
        'tailwindcss/no-unnecessary-arbitrary-value': ['error', option],
        ...overrides,
      },
    },
  ]
}
