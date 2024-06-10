import { GLOB_EXCLUDE } from '../globs'

import type { FlatESLintConfig } from '../types'

export function ignores(): FlatESLintConfig[] {
  return [
    {
      ignores: GLOB_EXCLUDE,
    },
  ]
}
