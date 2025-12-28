import { describe, expect, it } from 'vitest'

import { defineConfig } from '../src/index'

describe('defineConfig', () => {
  it('should work with tailwindcss single package mode (no packages array)', async () => {
    const config = await defineConfig({
      presets: {
        tailwindcss: {
          options: {
            entryPoint: 'src/styles.css',
            tailwindConfig: 'tailwind.config.js',
          },
        },
      },
    })

    const tailwindConfigs = config.filter(
      (c) => c.plugins && 'better-tailwindcss' in c.plugins,
    )

    expect(tailwindConfigs.length).toBe(1)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const settings = tailwindConfigs[0].settings?.['better-tailwindcss'] as any
    expect(settings.entryPoint).toBe('src/styles.css')
    expect(settings.tailwindConfig).toBe('tailwind.config.js')
  })

  it('should work with typescript single package mode (no packages array)', async () => {
    const config = await defineConfig({
      presets: {
        typescript: {
          options: {
            project: 'tsconfig.custom.json',
            tsconfigRootDir: '/custom/path',
          },
        },
      },
    })

    const tsConfigs = config.filter(
      (c) => c.plugins && '@typescript-eslint' in c.plugins,
    )

    expect(tsConfigs.length).toBeGreaterThan(0)

    const mainConfig = tsConfigs[0]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parserOptions = mainConfig.languageOptions!.parserOptions! as any
    expect(parserOptions.project).toBe('tsconfig.custom.json')
    expect(parserOptions.tsconfigRootDir).toBe('/custom/path')
  })

  it('should work with default options when no options provided', async () => {
    const config = await defineConfig({
      presets: {
        tailwindcss: true,
        typescript: true,
      },
    })

    const tailwindConfigs = config.filter(
      (c) => c.plugins && 'better-tailwindcss' in c.plugins,
    )
    expect(tailwindConfigs.length).toBe(1)

    const tsConfigs = config.filter(
      (c) => c.plugins && '@typescript-eslint' in c.plugins,
    )
    expect(tsConfigs.length).toBeGreaterThan(0)
  })
})

describe('defineConfig - React options', () => {
  it('should disable jsx-a11y rules when a11y is false', async () => {
    const config = await defineConfig({
      presets: {
        react: {
          options: {
            a11y: false,
          },
        },
      },
    })

    const reactConfigs = config.filter(
      (c) => c.plugins && 'jsx-a11y' in c.plugins,
    )

    expect(reactConfigs.length).toBeGreaterThan(0)

    const reactConfig = reactConfigs[0]
    const rules = reactConfig.rules || {}
    const a11yRules = Object.keys(rules).filter((rule) =>
      rule.startsWith('jsx-a11y/'),
    )

    expect(a11yRules.length).toBe(0)
  })

  it('should include jsx-a11y rules when a11y is true (default)', async () => {
    const config = await defineConfig({
      presets: {
        react: {
          options: {
            a11y: true,
          },
        },
      },
    })

    const reactConfigs = config.filter(
      (c) => c.plugins && 'jsx-a11y' in c.plugins,
    )

    expect(reactConfigs.length).toBeGreaterThan(0)

    const reactConfig = reactConfigs[0]
    const rules = reactConfig.rules || {}
    const a11yRules = Object.keys(rules).filter((rule) =>
      rule.startsWith('jsx-a11y/'),
    )

    expect(a11yRules.length).toBeGreaterThan(0)
  })

  it('should configure react-refresh for Next.js when framework.next is true', async () => {
    const config = await defineConfig({
      presets: {
        react: {
          options: {
            framework: {
              next: true,
              vite: false,
            },
          },
        },
      },
    })

    const reactConfigs = config.filter(
      (c) => c.plugins && 'react-refresh' in c.plugins,
    )

    expect(reactConfigs.length).toBeGreaterThan(0)

    const reactConfig = reactConfigs[0]
    const rules = reactConfig.rules || {}
    const reactRefreshRule = rules['react-refresh/only-export-components']

    expect(reactRefreshRule).toBeDefined()
    expect(Array.isArray(reactRefreshRule)).toBe(true)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ruleConfig = (reactRefreshRule as any[])[1]
    expect(ruleConfig.allowExportNames).toBeDefined()
    expect(ruleConfig.allowExportNames).toContain('dynamic')
    expect(ruleConfig.allowExportNames).toContain('metadata')
    expect(ruleConfig.allowExportNames).toContain('generateMetadata')
  })

  it('should configure react-refresh for Vite when framework.vite is true', async () => {
    const config = await defineConfig({
      presets: {
        react: {
          options: {
            framework: {
              next: false,
              vite: true,
            },
          },
        },
      },
    })

    const reactConfigs = config.filter(
      (c) => c.plugins && 'react-refresh' in c.plugins,
    )

    expect(reactConfigs.length).toBeGreaterThan(0)

    const reactConfig = reactConfigs[0]
    const rules = reactConfig.rules || {}
    const reactRefreshRule = rules['react-refresh/only-export-components']

    expect(reactRefreshRule).toBeDefined()
    expect(Array.isArray(reactRefreshRule)).toBe(true)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ruleConfig = (reactRefreshRule as any[])[1]
    expect(ruleConfig.allowConstantExport).toBe(true)
  })

  it('should auto-detect frameworks when no framework options provided', async () => {
    const config = await defineConfig({
      presets: {
        react: true,
      },
    })

    const reactConfigs = config.filter(
      (c) => c.plugins && 'react-refresh' in c.plugins,
    )

    expect(reactConfigs.length).toBeGreaterThan(0)

    const reactConfig = reactConfigs[0]
    const rules = reactConfig.rules || {}
    const reactRefreshRule = rules['react-refresh/only-export-components']

    expect(reactRefreshRule).toBeDefined()
  })
})
