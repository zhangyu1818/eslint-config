import { describe, expect, it } from 'vitest'

import { unicorn } from '../src/configs/unicorn'

describe('unicorn', () => {
  it('should generate correct config', () => {
    const configs = unicorn({})

    expect(configs.length).toBe(1)

    const config = configs[0]

    // Check plugins
    expect(config.plugins).toBeDefined()
    expect(config.plugins?.unicorn).toBeDefined()

    // Check key rules
    expect(config.rules).toBeDefined()
    expect(config.rules?.['unicorn/error-message']).toBe('error')
    expect(config.rules?.['unicorn/no-new-array']).toBe('error')
    expect(config.rules?.['unicorn/prefer-node-protocol']).toBe('error')
    expect(config.rules?.['unicorn/throw-new-error']).toBe('error')
  })

  it('should have consistent-function-scoping rule', () => {
    const configs = unicorn({})

    expect(configs[0].rules?.['unicorn/consistent-function-scoping']).toBe(
      'error',
    )
  })

  it('should have explicit-length-check rule with non-zero config', () => {
    const configs = unicorn({})

    expect(configs[0].rules?.['unicorn/explicit-length-check']).toEqual([
      'error',
      { 'non-zero': 'not-equal' },
    ])
  })

  it('should apply rule overrides', () => {
    const overrides = {
      'unicorn/error-message': 'warn' as const,
      'unicorn/no-new-array': 'off' as const,
    }

    const configs = unicorn(overrides)

    expect(configs[0].rules?.['unicorn/error-message']).toBe('warn')
    expect(configs[0].rules?.['unicorn/no-new-array']).toBe('off')
  })
})
