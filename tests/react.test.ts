import { describe, expect, it } from 'vitest'

import { react } from '../src/configs/react'
import { GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX } from '../src/globs'

describe('react', () => {
  it('should generate correct config with default options', () => {
    const configs = react()

    expect(configs.length).toBe(1)

    const config = configs[0]

    // Check files pattern
    expect(config.files).toBeDefined()
    expect(config.files).toEqual([GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX])

    // Check plugins
    expect(config.plugins).toBeDefined()
    expect(config.plugins?.react).toBeDefined()
    expect(config.plugins?.['react-hooks']).toBeDefined()
    expect(config.plugins?.['react-refresh']).toBeDefined()
    expect(config.plugins?.['jsx-a11y']).toBeDefined()

    // Check key rules
    expect(config.rules).toBeDefined()
    expect(config.rules?.['react-hooks/rules-of-hooks']).toBe('error')
    expect(config.rules?.['react-hooks/exhaustive-deps']).toBe('warn')
    expect(config.rules?.['react/jsx-key']).toBe('error')
    expect(config.rules?.['react/react-in-jsx-scope']).toBe('off')
  })

  it('should include a11y rules by default', () => {
    const configs = react()

    const config = configs[0]
    // a11y rules should be included
    expect(config.rules?.['jsx-a11y/alt-text']).toBeDefined()
  })

  it('should disable a11y rules when a11y option is false', () => {
    const configs = react({}, { a11y: false })

    const config = configs[0]
    // a11y rules should not be included
    expect(config.rules?.['jsx-a11y/alt-text']).toBeUndefined()
  })

  it('should configure react version in settings', () => {
    const configs = react({}, { version: '18.2' })

    const config = configs[0]
    expect(config.settings?.react).toBeDefined()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((config.settings?.react as any).version).toBe('18.2')
  })

  it('should apply rule overrides', () => {
    const overrides = {
      'react-hooks/exhaustive-deps': 'error' as const,
      'react/jsx-key': 'warn' as const,
    }

    const configs = react(overrides)

    expect(configs[0].rules?.['react/jsx-key']).toBe('warn')
    expect(configs[0].rules?.['react-hooks/exhaustive-deps']).toBe('error')
  })

  it('should configure react-refresh for Next.js', () => {
    const configs = react({}, { framework: { next: true, vite: false } })

    const config = configs[0]
    const refreshRule = config.rules?.['react-refresh/only-export-components']

    expect(refreshRule).toBeDefined()
    expect(Array.isArray(refreshRule)).toBe(true)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ruleOptions = (refreshRule as any[])[1]
    expect(ruleOptions.allowExportNames).toContain('metadata')
    expect(ruleOptions.allowExportNames).toContain('generateMetadata')
  })

  it('should configure react-refresh for Vite', () => {
    const configs = react({}, { framework: { next: false, vite: true } })

    const config = configs[0]
    const refreshRule = config.rules?.['react-refresh/only-export-components']

    expect(refreshRule).toBeDefined()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ruleOptions = (refreshRule as any[])[1]
    expect(ruleOptions.allowConstantExport).toBe(true)
  })
})
