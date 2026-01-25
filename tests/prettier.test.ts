import { describe, expect, it } from 'vitest'

import { prettier } from '../src/configs/prettier'

describe('prettier', () => {
  it('should generate correct config', () => {
    const configs = prettier({})

    expect(configs.length).toBe(1)

    const config = configs[0]

    // Check plugins
    expect(config.plugins).toBeDefined()
    expect(config.plugins?.prettier).toBeDefined()

    // Check rules
    expect(config.rules).toBeDefined()
  })

  it('should apply rule overrides', () => {
    const overrides = {
      'prettier/prettier': 'warn' as const,
    }

    const configs = prettier(overrides)

    expect(configs[0].rules?.['prettier/prettier']).toBe('warn')
  })
})
