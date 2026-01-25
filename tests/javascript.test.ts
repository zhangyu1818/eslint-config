import { describe, expect, it } from 'vitest'

import { javascript } from '../src/configs/javascript'

describe('javascript', () => {
  it('should generate correct config with default options', () => {
    const configs = javascript()

    expect(configs.length).toBe(2)

    const mainConfig = configs[0]

    // Check language options
    expect(mainConfig.languageOptions).toBeDefined()
    expect(mainConfig.languageOptions?.ecmaVersion).toBe(2022)
    expect(mainConfig.languageOptions?.sourceType).toBe('module')
    expect(mainConfig.languageOptions?.globals).toBeDefined()

    // Check plugins
    expect(mainConfig.plugins).toBeDefined()
    expect(mainConfig.plugins?.['unused-imports']).toBeDefined()

    // Check linter options
    expect(mainConfig.linterOptions?.reportUnusedDisableDirectives).toBe(true)

    // Check key rules
    expect(mainConfig.rules).toBeDefined()
    expect(mainConfig.rules?.['no-var']).toBe('error')
    expect(mainConfig.rules?.['prefer-const']).toBeDefined()
    expect(mainConfig.rules?.['no-console']).toBeDefined()
    expect(mainConfig.rules?.eqeqeq).toEqual(['error', 'smart'])
    expect(mainConfig.rules?.['unused-imports/no-unused-imports']).toBe('error')
  })

  it('should include scripts config that allows console', () => {
    const configs = javascript()

    const scriptsConfig = configs[1]
    expect(scriptsConfig.files).toBeDefined()
    expect(scriptsConfig.rules?.['no-console']).toBe('off')
  })

  it('should apply rule overrides', () => {
    const overrides = {
      'no-console': 'off' as const,
      'prefer-const': 'warn' as const,
    }

    const configs = javascript(overrides)

    expect(configs[0].rules?.['no-console']).toBe('off')
    expect(configs[0].rules?.['prefer-const']).toBe('warn')
  })

  it('should have correct globals configured', () => {
    const configs = javascript()

    const globals = configs[0].languageOptions?.globals as Record<
      string,
      string
    >
    expect(globals.document).toBe('readonly')
    expect(globals.navigator).toBe('readonly')
    expect(globals.window).toBe('readonly')
  })

  it('should have jsx enabled in parser options', () => {
    const configs = javascript()

    const parserOptions = configs[0].languageOptions?.parserOptions as {
      ecmaFeatures?: { jsx?: boolean }
    }
    expect(parserOptions.ecmaFeatures?.jsx).toBe(true)
  })
})
