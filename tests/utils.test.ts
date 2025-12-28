import { describe, expect, it } from 'vitest'

import { parsePresetConfig, validatePackages } from '../src/utils'

import type { PresetConfig } from '../src/types'

describe('parsePresetConfig', () => {
  it('should enable preset when true', () => {
    const result = parsePresetConfig(true)
    expect(result.enabled).toBe(true)
    expect(result.rules).toEqual({})
    expect(result.options).toBeUndefined()
  })

  it('should disable preset when false', () => {
    const result = parsePresetConfig(false)
    expect(result.enabled).toBe(false)
    expect(result.rules).toEqual({})
    expect(result.options).toBeUndefined()
  })

  it('should respect enabled state in PresetConfig object when true', () => {
    const preset: PresetConfig = { enabled: true }
    const result = parsePresetConfig(preset)
    expect(result.enabled).toBe(true)
  })

  it('should respect enabled state in PresetConfig object when false', () => {
    const preset: PresetConfig = { enabled: false }
    const result = parsePresetConfig(preset)
    expect(result.enabled).toBe(false)
  })

  it('should respect enabled state with rules and options', () => {
    const preset: PresetConfig = {
      enabled: true,
      options: { someOption: true },
      rules: { 'some-rule': 'error' },
    }
    const result = parsePresetConfig(preset)
    expect(result.enabled).toBe(true)
  })

  it('should apply rules from PresetConfig', () => {
    const preset: PresetConfig = {
      rules: { 'rule-1': 'error', 'rule-2': 'warn' },
    }
    const result = parsePresetConfig(preset)
    expect(result.rules).toEqual({ 'rule-1': 'error', 'rule-2': 'warn' })
  })

  it('should apply options from PresetConfig', () => {
    const preset: PresetConfig = {
      options: { key1: 'value1', key2: 42 },
    }
    const result = parsePresetConfig(preset)
    expect(result.options).toEqual({ key1: 'value1', key2: 42 })
  })

  it('should default enabled to true when not specified in PresetConfig', () => {
    const preset: PresetConfig = {
      rules: { 'some-rule': 'error' },
    }
    const result = parsePresetConfig(preset)
    expect(result.enabled).toBe(true)
  })

  it('should handle PresetConfig with all properties', () => {
    const preset: PresetConfig = {
      enabled: false,
      options: { option1: true },
      rules: { 'rule-1': 'error' },
    }
    const result = parsePresetConfig(preset)
    expect(result.enabled).toBe(false)
    expect(result.rules).toEqual({ 'rule-1': 'error' })
    expect(result.options).toEqual({ option1: true })
  })

  it('should use default enabled state when preset is undefined', () => {
    const resultDefaultFalse = parsePresetConfig(undefined, false)
    expect(resultDefaultFalse.enabled).toBe(false)
    expect(resultDefaultFalse.rules).toEqual({})
    expect(resultDefaultFalse.options).toBeUndefined()

    const resultDefaultTrue = parsePresetConfig(undefined, true)
    expect(resultDefaultTrue.enabled).toBe(true)
    expect(resultDefaultTrue.rules).toEqual({})
    expect(resultDefaultTrue.options).toBeUndefined()
  })
})

describe('validatePackages', () => {
  it('should throw error when packages array is empty', () => {
    expect(() => {
      validatePackages([], 'tailwindcss', ['files', 'entryPoint'])
    }).toThrow('tailwindcss: packages array cannot be empty')
  })

  it('should throw error when package is missing required field', () => {
    const packages = [{ files: ['**/*'] }]
    expect(() => {
      validatePackages(packages, 'tailwindcss', ['files', 'entryPoint'])
    }).toThrow(
      'tailwindcss: package at index 0 is missing required field "entryPoint"',
    )
  })

  it('should throw error with correct package index', () => {
    const packages = [
      { entryPoint: 'test.css', files: ['**/*'] },
      { files: ['**/*'] }, // Missing entryPoint
    ]
    expect(() => {
      validatePackages(packages, 'tailwindcss', ['files', 'entryPoint'])
    }).toThrow(
      'tailwindcss: package at index 1 is missing required field "entryPoint"',
    )
  })

  it('should not throw when all packages have required fields', () => {
    const packages = [
      { entryPoint: 'test1.css', files: ['**/*'] },
      { entryPoint: 'test2.css', files: ['**/*'] },
    ]
    expect(() => {
      validatePackages(packages, 'tailwindcss', ['files', 'entryPoint'])
    }).not.toThrow()
  })
})
