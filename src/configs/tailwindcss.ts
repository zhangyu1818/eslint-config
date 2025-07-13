// eslint-disable-next-line node/prefer-global/process
import process from 'node:process'

import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'
import { MatcherType } from 'eslint-plugin-better-tailwindcss/api/types'

import { GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX } from '../globs'

import type {
  FlatESLintConfig,
  RulesOverrides,
  TailwindCSSOptions,
} from '../types'

const cwd = process.cwd()

export function tailwindcss(
  options?: TailwindCSSOptions,
  overrides: RulesOverrides = {},
): FlatESLintConfig[] {
  const { entryPoint = `${cwd}/src/app/globals.css`, tailwindConfig } =
    options ?? {}
  return [
    {
      files: [GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX],
      plugins: {
        'better-tailwindcss': eslintPluginBetterTailwindcss,
      },
      rules: {
        'better-tailwindcss/enforce-consistent-class-order': 'error',
        'better-tailwindcss/enforce-consistent-line-wrapping': 'error',
        'better-tailwindcss/enforce-consistent-variable-syntax': 'error',
        'better-tailwindcss/enforce-shorthand-classes': 'error',
        'better-tailwindcss/no-conflicting-classes': 'error',
        'better-tailwindcss/no-duplicate-classes': 'error',
        'better-tailwindcss/no-unnecessary-whitespace': 'error',
        'better-tailwindcss/no-unregistered-classes': [
          'error',
          {
            detectComponentClasses: true,
            ignore: [],
          },
        ],

        ...overrides,
      },
      settings: {
        'better-tailwindcss': {
          entryPoint,
          tailwindConfig,
          tags: [
            'tw',
            [
              {
                match: MatcherType.String,
              },
            ],
          ],
        },
      },
    },
  ]
}
