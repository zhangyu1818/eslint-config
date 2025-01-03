import { isPackageExists } from 'local-pkg'

import {
  comments,
  ignores,
  imports,
  javascript,
  jsonc,
  jsx,
  next,
  node,
  perfectionist,
  prettier,
  react,
  regexp,
  sortPackageJson,
  sortTsconfig,
  tailwindcss,
  test,
  typescript,
  unicorn,
} from './configs'

import type {
  FlatESLintConfig,
  ReactFrameworkOptions,
  ReactOptions,
  RulesOverrides,
  TsParserOptions,
} from './types'

export interface Presets {
  comments?: boolean | RulesOverrides
  ignores?: boolean
  imports?: boolean | RulesOverrides
  javascript?: boolean | RulesOverrides
  jsonc?: boolean | RulesOverrides
  jsx?: boolean
  next?: boolean | RulesOverrides
  node?: boolean | RulesOverrides
  perfectionist?: boolean | RulesOverrides
  prettier?: boolean | RulesOverrides
  react?: boolean | RulesOverrides
  regexp?: boolean | RulesOverrides
  sort?: boolean
  tailwindcss?: boolean | RulesOverrides
  test?: boolean | RulesOverrides
  typescript?: boolean | RulesOverrides
  unicorn?: boolean | RulesOverrides
}

export interface Options {
  parserOptions?: TsParserOptions
  presets?: Presets
  reactOptions?: ReactOptions
}

const defaultPresets: Presets = {
  comments: true,
  ignores: true,
  imports: true,
  javascript: true,
  jsonc: true,
  jsx: true,
  perfectionist: true,
  regexp: true,
  sort: true,
  unicorn: true,
}

export function defineConfig(
  options: Options = {},
  userConfigs?: FlatESLintConfig[],
): FlatESLintConfig[] {
  const isUsingReact = isPackageExists('react')
  const isUsingTypeScript = isPackageExists('typescript')

  const presets: Presets = {
    ...defaultPresets,
    react: isUsingReact,
    typescript: isUsingTypeScript,
    ...options.presets,
  }

  const parserOptions: TsParserOptions = {
    ...(presets.typescript
      ? {
          project: true,
          tsconfigRootDir: process.cwd(),
        }
      : {}),
    ...options.parserOptions,
  }

  const reactFrameworkOptions: ReactFrameworkOptions = options.reactOptions
    ?.framework ?? {
    next: isPackageExists('next'),
    vite: isPackageExists('vite'),
  }

  const configs: FlatESLintConfig[] = []

  if (presets.ignores) {
    configs.push(...ignores())
  }

  if (presets.comments) {
    const overrides = getRuleOverrides(presets.comments)
    configs.push(...comments(overrides))
  }

  if (presets.unicorn) {
    const overrides = getRuleOverrides(presets.unicorn)
    configs.push(...unicorn(overrides))
  }

  if (presets.perfectionist) {
    const overrides = getRuleOverrides(presets.perfectionist)
    configs.push(...perfectionist(overrides))
  }

  if (presets.imports) {
    const overrides = getRuleOverrides(presets.imports)
    configs.push(...imports(overrides))
  }

  if (presets.jsonc) {
    const overrides = getRuleOverrides(presets.jsonc)
    configs.push(...jsonc(overrides))
  }

  if (presets.regexp) {
    const overrides = getRuleOverrides(presets.regexp)
    configs.push(...regexp(overrides))
  }

  if (presets.javascript) {
    const overrides = getRuleOverrides(presets.javascript)
    configs.push(...javascript(overrides))
  }

  if (presets.node) {
    const overrides = getRuleOverrides(presets.node)
    configs.push(...node(overrides))
  }

  if (presets.jsx) {
    configs.push(...jsx())
  }

  if (presets.typescript) {
    const overrides = getRuleOverrides(presets.typescript)
    configs.push(...typescript(overrides, parserOptions))
  }

  if (presets.react) {
    const overrides = getRuleOverrides(presets.react)
    configs.push(
      ...react(overrides, parserOptions, {
        framework: reactFrameworkOptions,
      }),
    )
  }

  if (
    (reactFrameworkOptions.next && presets.next !== false) ||
    !!presets.next
  ) {
    const overrides = getRuleOverrides(presets.next)
    configs.push(...next(overrides))
  }

  if (presets.test) {
    const overrides = getRuleOverrides(presets.test)
    configs.push(...test(overrides))
  }

  if (presets.sort) {
    configs.push(...sortPackageJson())
    configs.push(...sortTsconfig())
  }

  if (presets.prettier) {
    const overrides = getRuleOverrides(presets.prettier)
    configs.push(...prettier(overrides))
  }

  if (presets.tailwindcss) {
    const overrides = getRuleOverrides(presets.tailwindcss)
    configs.push(...tailwindcss(overrides))
  }

  if (userConfigs) {
    configs.push(...userConfigs)
  }

  return configs
}

function getRuleOverrides(rules: boolean | RulesOverrides) {
  if (typeof rules === 'boolean') {
    return {} as RulesOverrides
  }
  return rules
}
