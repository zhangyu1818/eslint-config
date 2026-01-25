import { describe, expect, it } from 'vitest'

import { comments } from '../src/configs/comments'

describe('comments', () => {
  it('should generate correct config', () => {
    const configs = comments()

    expect(configs.length).toBe(1)

    const config = configs[0]

    // Check plugins
    expect(config.plugins).toBeDefined()
    expect(config.plugins?.['eslint-comments']).toBeDefined()

    // Check key rules
    expect(config.rules).toBeDefined()
    expect(config.rules?.['eslint-comments/no-aggregating-enable']).toBe(
      'error',
    )
    expect(config.rules?.['eslint-comments/no-duplicate-disable']).toBe('error')
    expect(config.rules?.['eslint-comments/no-unlimited-disable']).toBe('error')
    expect(config.rules?.['eslint-comments/no-unused-enable']).toBe('error')
  })

  it('should apply rule overrides', () => {
    const overrides = {
      'eslint-comments/no-unlimited-disable': 'warn' as const,
    }

    const configs = comments(overrides)

    expect(configs[0].rules?.['eslint-comments/no-unlimited-disable']).toBe(
      'warn',
    )
  })
})
