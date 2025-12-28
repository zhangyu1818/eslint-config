import type { PackageConfig, PresetConfig, RulesOverrides } from './types'

export function interopDefault<T>(
  m: T,
): T extends { default: infer U } ? U : T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (m as any).default || m
}

export function parsePresetConfig<T>(
  preset: boolean | PresetConfig<T> | undefined,
  defaultEnabled: boolean = false,
): { enabled: boolean; options: T | undefined; rules: RulesOverrides } {
  if (preset === undefined) {
    return { enabled: defaultEnabled, options: undefined, rules: {} }
  }

  if (typeof preset === 'boolean') {
    return { enabled: preset, options: undefined, rules: {} }
  }

  const enabled = preset.enabled ?? true
  const rules = preset.rules ?? {}
  const options = preset.options

  return { enabled, options, rules }
}

export function validatePackages(
  packages: PackageConfig[],
  presetName: string,
  requiredFields: string[],
): void {
  if (packages.length === 0) {
    throw new Error(`${presetName}: packages array cannot be empty`)
  }

  packages.forEach((pkg, index) => {
    requiredFields.forEach((field) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!(field in pkg) || (pkg as any)[field] === undefined) {
        throw new Error(
          `${presetName}: package at index ${index} is missing required field "${field}"`,
        )
      }
    })
  })
}
