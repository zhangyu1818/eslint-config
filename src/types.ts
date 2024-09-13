import type { FlatESLintConfig } from 'eslint-define-config'

export type { FlatESLintConfig }

export type RulesOverrides = FlatESLintConfig['rules']
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
