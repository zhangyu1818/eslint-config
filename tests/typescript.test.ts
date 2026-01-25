import { isAbsolute, resolve } from 'node:path'

import { describe, expect, it } from 'vitest'

import { typescript } from '../src/configs/typescript'

import type { TypeScriptPackageConfig } from '../src/types'

describe('typescript', () => {
  it('should generate correct config for each package in packages array', () => {
    const packages: TypeScriptPackageConfig[] = [
      {
        files: ['packages/web/**/*.{ts,tsx}'],
        project: 'packages/web/tsconfig.json',
        tsconfigRootDir: 'packages/web',
      },
      {
        files: ['packages/admin/**/*.{ts,tsx}'],
        tsconfigRootDir: 'packages/admin',
        project: [
          'packages/admin/tsconfig.json',
          'packages/admin/tsconfig.node.json',
        ],
      },
      {
        files: ['apps/mobile/**/*.tsx'],
        project: true,
        tsconfigRootDir: 'apps/mobile',
      },
    ]

    const configs = typescript({ packages })

    expect(configs.length).toBe(packages.length + 3)

    configs.slice(0, packages.length).forEach((config, index) => {
      const pkg = packages[index]

      expect(config.files).toEqual(pkg.files)

      expect(config.languageOptions?.parser).toBeDefined()

      expect(config.languageOptions?.parserOptions).toBeDefined()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const parserOptions = config.languageOptions!.parserOptions! as any

      /* eslint-disable vitest/no-conditional-expect */
      // Project paths should be resolved to absolute paths
      if (typeof pkg.project === 'string') {
        expect(isAbsolute(parserOptions.project)).toBe(true)
        expect(parserOptions.project).toContain(pkg.project)
      } else if (Array.isArray(pkg.project)) {
        expect(Array.isArray(parserOptions.project)).toBe(true)
        parserOptions.project.forEach((p: string) => {
          expect(isAbsolute(p)).toBe(true)
        })
      } else {
        expect(parserOptions.project).toBe(pkg.project)
      }
      /* eslint-enable vitest/no-conditional-expect */

      expect(parserOptions.tsconfigRootDir).toBe(pkg.tsconfigRootDir)
      expect(parserOptions.sourceType).toBe('module')

      expect(config.plugins).toBeDefined()
      expect(config.plugins?.['@typescript-eslint']).toBeDefined()

      expect(config.rules).toBeDefined()
      expect(config.rules?.['@typescript-eslint/array-type']).toBe('error')
      expect(config.rules?.['@typescript-eslint/no-explicit-any']).toBe('warn')
    })

    const additionalConfigs = configs.slice(packages.length)
    expect(additionalConfigs.length).toBe(3)

    expect(additionalConfigs[0].files).toEqual(['**/*.d.([cm])ts'])

    expect(additionalConfigs[1].files).toEqual(['**/*.{test,spec}.ts?(x)'])

    expect(additionalConfigs[2].files).toEqual(['**/*.js', '**/*.cjs'])
  })

  it('should generate single config when no packages array provided', () => {
    const project = 'custom/tsconfig.json'
    const tsconfigRootDir = '/custom/path'

    const configs = typescript({ project, tsconfigRootDir })

    expect(configs.length).toBe(4)

    const mainConfig = configs[0]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parserOptions = mainConfig.languageOptions!.parserOptions! as any
    // Project should be resolved to absolute path
    expect(isAbsolute(parserOptions.project)).toBe(true)
    expect(parserOptions.project).toBe(resolve(tsconfigRootDir, project))
    expect(parserOptions.tsconfigRootDir).toBe(tsconfigRootDir)
  })

  it('should use default options when no options provided', () => {
    const configs = typescript()

    expect(configs.length).toBe(4)

    const mainConfig = configs[0]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parserOptions = mainConfig.languageOptions!.parserOptions! as any
    expect(parserOptions.project).toBe(true)
    expect(parserOptions.tsconfigRootDir).toBeDefined()
  })

  it('should apply rule overrides to all package configs', () => {
    const packages: TypeScriptPackageConfig[] = [
      { files: ['pkg1/**/*.ts'], project: true, tsconfigRootDir: 'pkg1' },
      { files: ['pkg2/**/*.ts'], project: true, tsconfigRootDir: 'pkg2' },
    ]

    const overrides = {
      '@typescript-eslint/no-explicit-any': 'error' as const,
    }

    const configs = typescript({ packages }, overrides)

    configs.slice(0, packages.length).forEach((config) => {
      expect(config.rules?.['@typescript-eslint/no-explicit-any']).toBe('error')
    })
  })

  it('should use fallback values from top-level options when package options are missing', () => {
    const packages: TypeScriptPackageConfig[] = [
      {
        files: ['packages/web/**/*.ts'],
      },
      {
        files: ['packages/admin/**/*.ts'],
        project: 'packages/admin/tsconfig.json',
      },
    ]

    const topLevelProject = 'tsconfig.base.json'
    const topLevelTsconfigRootDir = '/root'

    const configs = typescript({
      packages,
      project: topLevelProject,
      tsconfigRootDir: topLevelTsconfigRootDir,
    })

    const firstConfig = configs[0]
    const firstParserOptions = firstConfig.languageOptions!
      .parserOptions! as any // eslint-disable-line @typescript-eslint/no-explicit-any
    // Project should be resolved to absolute path
    expect(isAbsolute(firstParserOptions.project)).toBe(true)
    expect(firstParserOptions.project).toBe(
      resolve(topLevelTsconfigRootDir, topLevelProject),
    )
    expect(firstParserOptions.tsconfigRootDir).toBe(topLevelTsconfigRootDir)

    const secondConfig = configs[1]
    const secondParserOptions = secondConfig.languageOptions!
      .parserOptions! as any // eslint-disable-line @typescript-eslint/no-explicit-any
    expect(isAbsolute(secondParserOptions.project)).toBe(true)
    expect(secondParserOptions.tsconfigRootDir).toBe(topLevelTsconfigRootDir)
  })
})
