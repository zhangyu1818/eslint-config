import { ESLint } from 'eslint'
import { describe, expect, it } from 'vitest'

import { tailwindcss } from '../src/configs/tailwindcss'

import type { TailwindCSSPackageConfig } from '../src/types'

describe('tailwindcss', () => {
  it('should generate correct config for each package in packages array', () => {
    const packages: TailwindCSSPackageConfig[] = [
      {
        entryPoint: 'packages/web/src/globals.css',
        files: ['packages/web/**/*.{js,jsx,ts,tsx}'],
      },
      {
        entryPoint: 'packages/admin/src/main.css',
        files: ['packages/admin/**/*.{js,jsx,ts,tsx}'],
        tailwindConfig: 'packages/admin/tailwind.config.js',
      },
      {
        entryPoint: 'apps/mobile/styles.css',
        files: ['apps/mobile/**/*.tsx'],
      },
    ]

    const configs = tailwindcss({ packages })

    expect(configs.length).toBe(packages.length)

    configs.forEach((config, index) => {
      const pkg = packages[index]

      expect(config.files).toEqual(pkg.files)

      expect(config.plugins).toBeDefined()
      expect(config.plugins?.['better-tailwindcss']).toBeDefined()

      expect(config.rules).toBeDefined()
      expect(
        config.rules?.['better-tailwindcss/enforce-consistent-class-order'],
      ).toBe('error')
      expect(
        config.rules?.['better-tailwindcss/enforce-consistent-line-wrapping'],
      ).toBe('error')
      expect(
        config.rules?.['better-tailwindcss/enforce-consistent-variable-syntax'],
      ).toBe('error')
      expect(
        config.rules?.['better-tailwindcss/enforce-shorthand-classes'],
      ).toBe('error')
      expect(config.rules?.['better-tailwindcss/no-conflicting-classes']).toBe(
        'error',
      )
      expect(config.rules?.['better-tailwindcss/no-duplicate-classes']).toBe(
        'error',
      )
      expect(
        config.rules?.['better-tailwindcss/no-unnecessary-whitespace'],
      ).toBe('error')
      expect(
        config.rules?.['better-tailwindcss/no-unknown-classes'],
      ).toBeDefined()

      expect(config.settings).toBeDefined()
      expect(config.settings?.['better-tailwindcss']).toBeDefined()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const settings = config.settings?.['better-tailwindcss'] as any
      expect(settings.entryPoint).toBe(pkg.entryPoint)
      expect(settings.tags).toEqual([['tw', [{ match: 'strings' }]]])
      expect(settings.tailwindConfig).toBe(pkg.tailwindConfig)
    })
  })

  it('should generate single config when no packages array provided', () => {
    const entryPoint = 'custom/entry.css'
    const tailwindConfig = 'custom/tailwind.config.js'

    const configs = tailwindcss({ entryPoint, tailwindConfig })

    expect(configs.length).toBe(1)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const settings = configs[0].settings?.['better-tailwindcss'] as any
    expect(settings.entryPoint).toBe(entryPoint)
    expect(settings.tags).toEqual([['tw', [{ match: 'strings' }]]])
    expect(settings.tailwindConfig).toBe(tailwindConfig)
  })

  it('should use default entryPoint when no options provided', () => {
    const configs = tailwindcss()

    expect(configs.length).toBe(1)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const settings = configs[0].settings?.['better-tailwindcss'] as any
    expect(settings.entryPoint).toContain('src/app/globals.css')
    expect(settings.tags).toEqual([['tw', [{ match: 'strings' }]]])
  })

  it('should apply rule overrides to all package configs', () => {
    const packages: TailwindCSSPackageConfig[] = [
      { entryPoint: 'pkg1/styles.css', files: ['pkg1/**/*'] },
      { entryPoint: 'pkg2/styles.css', files: ['pkg2/**/*'] },
    ]

    const overrides = {
      'better-tailwindcss/no-duplicate-classes': 'warn' as const,
    }

    const configs = tailwindcss({ packages }, overrides)

    configs.forEach((config) => {
      expect(config.rules?.['better-tailwindcss/no-duplicate-classes']).toBe(
        'warn',
      )
    })
  })

  it('should lint string literals inside tw tagged template expressions', async () => {
    const [config] = tailwindcss(undefined, {
      'better-tailwindcss/enforce-consistent-class-order': 'off',
      'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
      'better-tailwindcss/enforce-consistent-variable-syntax': 'off',
      'better-tailwindcss/enforce-shorthand-classes': 'off',
      'better-tailwindcss/no-conflicting-classes': 'off',
      'better-tailwindcss/no-unknown-classes': 'off',
      'better-tailwindcss/no-unnecessary-whitespace': 'off',
    })

    const eslint = new ESLint({
      overrideConfig: [config],
      overrideConfigFile: true,
    })

    const code = [
      'const active = true',
      "const foo = tw`" + '$' + "{active ? 'px-2 px-2' : ''}`",
      '',
    ].join('\n')

    const [result] = await eslint.lintText(
      code,
      { filePath: 'example.js' },
    )

    expect(result.messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ruleId: 'better-tailwindcss/no-duplicate-classes',
        }),
      ]),
    )
  })
})
