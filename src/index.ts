import { isPackageExists } from 'local-pkg'

import type {
  FlatESLintConfig,
  ReactFrameworkOptions,
  ReactOptions,
  RulesOverrides,
  TailwindCSSOptions,
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
  tailwindcssOptions?: TailwindCSSOptions
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

export async function defineConfig(
  options: Options = {},
  userConfigs?: FlatESLintConfig[],
): Promise<FlatESLintConfig[]> {
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
    const { ignores } = await import('./configs/ignores')
    configs.push(...ignores())
  }

  if (presets.comments) {
    const { comments } = await import('./configs/comments')
    const overrides = getRuleOverrides(presets.comments)
    configs.push(...comments(overrides))
  }

  if (presets.unicorn) {
    const overrides = getRuleOverrides(presets.unicorn)
    const { unicorn } = await import('./configs/unicorn')
    configs.push(...unicorn(overrides))
  }

  if (presets.perfectionist) {
    const overrides = getRuleOverrides(presets.perfectionist)
    const { perfectionist } = await import('./configs/perfectionist')
    configs.push(...perfectionist(overrides))
  }

  if (presets.imports) {
    const overrides = getRuleOverrides(presets.imports)
    const { imports } = await import('./configs/imports')
    configs.push(...imports(overrides))
  }

  if (presets.jsonc) {
    const overrides = getRuleOverrides(presets.jsonc)
    const { jsonc } = await import('./configs/jsonc')
    configs.push(...jsonc(overrides))
  }

  if (presets.regexp) {
    const overrides = getRuleOverrides(presets.regexp)
    const { regexp } = await import('./configs/regexp')
    configs.push(...regexp(overrides))
  }

  if (presets.javascript) {
    const overrides = getRuleOverrides(presets.javascript)
    const { javascript } = await import('./configs/javascript')
    configs.push(...javascript(overrides))
  }

  if (presets.node) {
    const overrides = getRuleOverrides(presets.node)
    const { node } = await import('./configs/node')
    configs.push(...node(overrides))
  }

  if (presets.jsx) {
    const { jsx } = await import('./configs/jsx')
    configs.push(...jsx())
  }

  if (presets.typescript) {
    const overrides = getRuleOverrides(presets.typescript)
    const { typescript } = await import('./configs/typescript')
    configs.push(...typescript(overrides, parserOptions))
  }

  if (presets.react) {
    const overrides = getRuleOverrides(presets.react)
    const { react } = await import('./configs/react')
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
    const { next } = await import('./configs/next')
    configs.push(...next(overrides))
  }

  if (presets.test) {
    const overrides = getRuleOverrides(presets.test)
    const { test } = await import('./configs/test')
    configs.push(...test(overrides))
  }

  if (presets.sort) {
    const { sortPackageJson } = await import('./configs/sort')
    const { sortTsconfig } = await import('./configs/sort')
    configs.push(...sortPackageJson())
    configs.push(...sortTsconfig())
  }

  if (presets.prettier) {
    const overrides = getRuleOverrides(presets.prettier)
    const { prettier } = await import('./configs/prettier')
    configs.push(...prettier(overrides))
  }

  if (presets.tailwindcss) {
    const overrides = getRuleOverrides(presets.tailwindcss)
    const { tailwindcss } = await import('./configs/tailwindcss')
    configs.push(...tailwindcss(options.tailwindcssOptions, overrides))
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
