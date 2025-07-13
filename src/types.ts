import type { Linter } from 'eslint'

export type FlatESLintConfig = Linter.Config

export type RulesOverrides = Linter.Config['rules']

export interface TsParserOptions {
  project?: boolean | string | string[]
  tsconfigRootDir?: string
}

export interface ReactFrameworkOptions {
  next?: boolean
  vite?: boolean
}

export interface ReactOptions {
  a11y?: boolean
  framework?: ReactFrameworkOptions
}

export interface TailwindCSSOptions {
  entryPoint?: string
  tailwindConfig?: string
}
