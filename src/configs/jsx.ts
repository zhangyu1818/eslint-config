import { GLOB_JSX, GLOB_TSX } from '../globs'

import type { FlatESLintConfig } from '../types'

export function jsx(): FlatESLintConfig[] {
  return [
    {
      files: [GLOB_JSX, GLOB_TSX],
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
    },
  ]
}
