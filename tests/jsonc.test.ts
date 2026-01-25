import { describe, expect, it } from 'vitest'

import { jsonc } from '../src/configs/jsonc'

describe('jsonc', () => {
  it('should generate correct config', () => {
    const configs = jsonc()

    expect(configs.length).toBe(1)

    const config = configs[0]

    // Check files pattern
    expect(config.files).toBeDefined()
    expect(config.files).toContain('**/*.json')
    expect(config.files).toContain('**/*.json5')
    expect(config.files).toContain('**/*.jsonc')

    // Check parser
    expect(config.languageOptions?.parser).toBeDefined()

    // Check plugins
    expect(config.plugins).toBeDefined()
    expect(config.plugins?.jsonc).toBeDefined()

    // Check key rules
    expect(config.rules).toBeDefined()
    expect(config.rules?.['jsonc/no-dupe-keys']).toBe('error')
    expect(config.rules?.['jsonc/no-infinity']).toBe('error')
    expect(config.rules?.['jsonc/no-nan']).toBe('error')
    expect(config.rules?.['jsonc/valid-json-number']).toBe('error')
  })

  it('should apply rule overrides', () => {
    const overrides = {
      'jsonc/no-dupe-keys': 'warn' as const,
    }

    const configs = jsonc(overrides)

    expect(configs[0].rules?.['jsonc/no-dupe-keys']).toBe('warn')
  })
})
