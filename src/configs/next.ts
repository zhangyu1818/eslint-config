// @ts-expect-error - from eslint-config-next
import nextPlugin from '@next/eslint-plugin-next'

import { GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX } from '../globs'

import type { FlatESLintConfig, RulesOverrides } from '../types'

export function next(overrides: RulesOverrides): FlatESLintConfig[] {
  return [
    {
      files: [GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX],
      plugins: {
        '@next/next': nextPlugin,
      },
      rules: {
        ...nextPlugin.configs.recommended.rules,
        ...nextPlugin.configs['core-web-vitals'].rules,
        ...overrides,
      },
    },
  ]
}
