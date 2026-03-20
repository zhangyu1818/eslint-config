// eslint-disable-next-line node/prefer-global/process
import process from 'node:process'

import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'
import { MatcherType } from 'eslint-plugin-better-tailwindcss/types'
import { isPackageExists } from 'local-pkg'

import { GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX } from '../globs'
import { validatePackages } from '../utils'

import type {
  FlatESLintConfig,
  RulesOverrides,
  TailwindCSSOptions,
} from '../types'

const cwd = process.cwd()

const createTailwindRules = (
  overrides: RulesOverrides = {},
): RulesOverrides => ({
  'better-tailwindcss/enforce-consistent-class-order': 'error',
  'better-tailwindcss/enforce-consistent-line-wrapping': 'error',
  'better-tailwindcss/enforce-consistent-variable-syntax': 'error',
  'better-tailwindcss/enforce-shorthand-classes': 'error',
  'better-tailwindcss/no-conflicting-classes': 'error',
  'better-tailwindcss/no-duplicate-classes': 'error',
  'better-tailwindcss/no-unknown-classes': 'error',
  'better-tailwindcss/no-unnecessary-whitespace': 'error',
  ...overrides,
})

const createTailwindConfig = (
  files: string[],
  entryPoint: string,
  tailwindConfig: string | undefined,
  overrides: RulesOverrides,
): FlatESLintConfig => ({
  files,
  rules: createTailwindRules(overrides),
  plugins: {
    'better-tailwindcss': eslintPluginBetterTailwindcss,
  },
  settings: {
    'better-tailwindcss': {
      entryPoint,
      tags: [['tw', [{ match: MatcherType.String }]]],
      tailwindConfig,
    },
  },
})

export function tailwindcss(
  options?: TailwindCSSOptions,
  overrides: RulesOverrides = {},
): FlatESLintConfig[] {
  if (!isPackageExists('tailwindcss')) {
    return []
  }

  const {
    entryPoint = `${cwd}/src/app/globals.css`,
    packages,
    tailwindConfig,
  } = options ?? {}

  if (packages && packages.length !== 0) {
    validatePackages(packages, 'tailwindcss', ['files', 'entryPoint'])

    return packages.map((pkg) =>
      createTailwindConfig(
        pkg.files,
        pkg.entryPoint,
        pkg.tailwindConfig,
        overrides,
      ),
    )
  }

  return [
    createTailwindConfig(
      [GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX],
      entryPoint,
      tailwindConfig,
      overrides,
    ),
  ]
}
