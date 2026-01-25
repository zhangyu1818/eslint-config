import { isPackageExists } from 'local-pkg'

import { parsePresetConfig } from './utils'

import type {
  FlatESLintConfig,
  PresetConfig,
  ReactOptions,
  TailwindCSSOptions,
  TypeScriptOptions,
} from './types'

// Re-export types
export type {
  FlatESLintConfig,
  PresetConfig,
  ReactOptions,
  TailwindCSSOptions,
  TailwindCSSPackageConfig,
  TypeScriptOptions,
  TypeScriptPackageConfig,
} from './types'

export interface Presets {
  comments?: boolean | PresetConfig
  ignores?: boolean
  imports?: boolean | PresetConfig
  javascript?: boolean | PresetConfig
  jsonc?: boolean | PresetConfig
  jsx?: boolean
  next?: boolean | PresetConfig
  node?: boolean | PresetConfig
  perfectionist?: boolean | PresetConfig
  prettier?: boolean | PresetConfig
  react?: boolean | PresetConfig<ReactOptions>
  regexp?: boolean | PresetConfig
  sort?: boolean
  tailwindcss?: boolean | PresetConfig<TailwindCSSOptions>
  test?: boolean | PresetConfig
  typescript?: boolean | PresetConfig<TypeScriptOptions>
  unicorn?: boolean | PresetConfig
}

export interface Options {
  presets?: Presets
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

  const configs: FlatESLintConfig[] = []

  if (presets.ignores) {
    const { ignores } = await import('./configs/ignores')
    configs.push(...ignores())
  }

  if (presets.comments) {
    const { comments } = await import('./configs/comments')
    const { enabled, rules } = parsePresetConfig(presets.comments)
    if (enabled) {
      configs.push(...comments(rules))
    }
  }

  if (presets.unicorn) {
    const { unicorn } = await import('./configs/unicorn')
    const { enabled, rules } = parsePresetConfig(presets.unicorn)
    if (enabled) {
      configs.push(...unicorn(rules))
    }
  }

  if (presets.perfectionist) {
    const { perfectionist } = await import('./configs/perfectionist')
    const { enabled, rules } = parsePresetConfig(presets.perfectionist)
    if (enabled) {
      configs.push(...perfectionist(rules))
    }
  }

  if (presets.imports) {
    const { imports } = await import('./configs/imports')
    const { enabled, rules } = parsePresetConfig(presets.imports)
    if (enabled) {
      configs.push(...imports(rules))
    }
  }

  if (presets.jsonc) {
    const { jsonc } = await import('./configs/jsonc')
    const { enabled, rules } = parsePresetConfig(presets.jsonc)
    if (enabled) {
      configs.push(...jsonc(rules))
    }
  }

  if (presets.regexp) {
    const { regexp } = await import('./configs/regexp')
    const { enabled, rules } = parsePresetConfig(presets.regexp)
    if (enabled) {
      configs.push(...regexp(rules))
    }
  }

  if (presets.javascript) {
    const { javascript } = await import('./configs/javascript')
    const { enabled, rules } = parsePresetConfig(presets.javascript)
    if (enabled) {
      configs.push(...javascript(rules))
    }
  }

  if (presets.node) {
    const { node } = await import('./configs/node')
    const { enabled, rules } = parsePresetConfig(presets.node)
    if (enabled) {
      configs.push(...node(rules))
    }
  }

  if (presets.jsx) {
    const { jsx } = await import('./configs/jsx')
    configs.push(...jsx())
  }

  if (presets.typescript) {
    const { typescript } = await import('./configs/typescript')
    const {
      enabled,
      options: tsOptions,
      rules,
    } = parsePresetConfig<TypeScriptOptions>(presets.typescript)
    if (enabled) {
      configs.push(...typescript(tsOptions, rules))
    }
  }

  if (presets.react) {
    const { react } = await import('./configs/react')
    const {
      enabled,
      options: reactOptions,
      rules,
    } = parsePresetConfig<ReactOptions>(presets.react)
    if (enabled) {
      configs.push(...react(rules, reactOptions))
    }
  }

  if (presets.next) {
    const { next } = await import('./configs/next')
    const { enabled, rules } = parsePresetConfig(presets.next)
    if (enabled) {
      configs.push(...next(rules))
    }
  }

  if (presets.test) {
    const { test } = await import('./configs/test')
    const { enabled, rules } = parsePresetConfig(presets.test)
    if (enabled) {
      configs.push(...test(rules))
    }
  }

  if (presets.sort) {
    const { sortPackageJson } = await import('./configs/sort')
    const { sortTsconfig } = await import('./configs/sort')
    configs.push(...sortPackageJson())
    configs.push(...sortTsconfig())
  }

  if (presets.tailwindcss) {
    const { tailwindcss } = await import('./configs/tailwindcss')
    const {
      enabled,
      options: tailwindOptions,
      rules,
    } = parsePresetConfig<TailwindCSSOptions>(presets.tailwindcss)
    if (enabled) {
      configs.push(...tailwindcss(tailwindOptions, rules))
    }
  }

  if (presets.prettier) {
    const { prettier } = await import('./configs/prettier')
    const { enabled, rules } = parsePresetConfig(presets.prettier)
    if (enabled) {
      configs.push(...prettier(rules))
    }
  }

  if (userConfigs) {
    configs.push(...userConfigs)
  }

  return configs
}
