import { describe, expect, it } from 'vitest'

import { perfectionist } from '../src/configs/perfectionist'

describe('perfectionist', () => {
  it('should generate correct config', () => {
    const configs = perfectionist({})

    expect(configs.length).toBe(1)

    const config = configs[0]

    // Check plugins
    expect(config.plugins).toBeDefined()
    expect(config.plugins?.perfectionist).toBeDefined()

    // Check key rules
    expect(config.rules).toBeDefined()
    expect(config.rules?.['perfectionist/sort-imports']).toBeDefined()
    expect(config.rules?.['perfectionist/sort-interfaces']).toBeDefined()
    expect(config.rules?.['perfectionist/sort-objects']).toBeDefined()
    expect(config.rules?.['perfectionist/sort-classes']).toBeDefined()
  })

  it('should configure sort-imports with custom groups', () => {
    const configs = perfectionist({})

    const sortImportsRule = configs[0].rules?.['perfectionist/sort-imports']
    expect(sortImportsRule).toBeDefined()
    expect(Array.isArray(sortImportsRule)).toBe(true)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ruleOptions = (sortImportsRule as any[])[1]
    expect(ruleOptions.order).toBe('asc')
    expect(ruleOptions.type).toBe('natural')
    expect(ruleOptions.internalPattern).toContain('^@/.*')
  })

  it('should configure sort-objects with custom groups', () => {
    const configs = perfectionist({})

    const sortObjectsRule = configs[0].rules?.['perfectionist/sort-objects']
    expect(sortObjectsRule).toBeDefined()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ruleOptions = (sortObjectsRule as any[])[1]
    expect(ruleOptions.groups).toContain('top')
    expect(ruleOptions.partitionByComment).toBe(true)
    expect(ruleOptions.partitionByNewLine).toBe(true)
  })

  it('should have perfectionist settings', () => {
    const configs = perfectionist({})

    expect(configs[0].settings?.perfectionist).toBeDefined()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((configs[0].settings?.perfectionist as any).ignoreCase).toBe(false)
  })

  it('should apply rule overrides', () => {
    const overrides = {
      'perfectionist/sort-imports': 'off' as const,
    }

    const configs = perfectionist(overrides)

    expect(configs[0].rules?.['perfectionist/sort-imports']).toBe('off')
  })
})
