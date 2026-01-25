import { describe, expect, it } from 'vitest'

import { imports } from '../src/configs/imports'

describe('imports', () => {
  it('should generate correct config', () => {
    const configs = imports({})

    expect(configs.length).toBe(1)

    const config = configs[0]

    // Check plugins
    expect(config.plugins).toBeDefined()
    expect(config.plugins?.import).toBeDefined()

    // Check key rules
    expect(config.rules).toBeDefined()
    expect(config.rules?.['import/first']).toBe('error')
    expect(config.rules?.['import/no-duplicates']).toBeDefined()
    expect(config.rules?.['import/no-mutable-exports']).toBe('error')
    expect(config.rules?.['import/no-self-import']).toBe('error')
  })

  it('should configure newline-after-import rule', () => {
    const configs = imports({})

    const config = configs[0]
    expect(config.rules?.['import/newline-after-import']).toEqual([
      'error',
      { count: 1 },
    ])
  })

  it('should configure no-duplicates with prefer-inline', () => {
    const configs = imports({})

    const config = configs[0]
    expect(config.rules?.['import/no-duplicates']).toEqual([
      'error',
      { 'prefer-inline': true },
    ])
  })

  it('should apply rule overrides', () => {
    const overrides = {
      'import/first': 'warn' as const,
      'import/no-duplicates': 'off' as const,
    }

    const configs = imports(overrides)

    expect(configs[0].rules?.['import/first']).toBe('warn')
    expect(configs[0].rules?.['import/no-duplicates']).toBe('off')
  })
})
