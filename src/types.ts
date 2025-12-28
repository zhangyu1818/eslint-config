import type { Linter } from 'eslint'

export type FlatESLintConfig = Linter.Config

export type RulesOverrides = Linter.Config['rules']

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PresetConfig<TOptions = {}> {
  enabled?: boolean
  options?: TOptions
  rules?: RulesOverrides
}

export interface PackageConfig {
  files: string[]
}

export interface TailwindCSSPackageConfig extends PackageConfig {
  entryPoint: string
  tailwindConfig?: string
}

export interface TailwindCSSOptions {
  entryPoint?: string
  packages?: TailwindCSSPackageConfig[]
  tailwindConfig?: string
}

export interface TypeScriptPackageConfig extends PackageConfig {
  project?: boolean | string | string[]
  tsconfigRootDir?: string
}

export interface TypeScriptOptions {
  packages?: TypeScriptPackageConfig[]
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
  version?: string
}
