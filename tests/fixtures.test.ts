import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { ESLint } from 'eslint'
import { describe, expect, it } from 'vitest'

import { defineConfig } from '../src/index'

describe('Fixture Tests', () => {
  describe('Valid Fixtures', () => {
    it('should pass linting for all valid fixtures', async () => {
      const config = await defineConfig({
        presets: {
          ignores: false,
          javascript: true,
          prettier: true,
          tailwindcss: true,
          typescript: false,
          react: {
            options: {
              version: '18.3',
            },
          },
        },
      })

      const eslint = new ESLint({
        overrideConfig: config,
        overrideConfigFile: true,
      })

      const validFixturesPath = join(process.cwd(), 'tests/fixtures/valid')
      const categories = await readdir(validFixturesPath, {
        withFileTypes: true,
      })

      for (const category of categories) {
        if (!category.isDirectory()) continue

        const categoryPath = join(validFixturesPath, category.name)
        const files = await readdir(categoryPath)

        for (const file of files) {
          const filePath = join(categoryPath, file)
          const results = await eslint.lintFiles([filePath])

          const errors = results.flatMap((result) =>
            result.messages.filter((msg) => msg.severity === 2),
          )

          if (errors.length !== 0) {
            const errorMessages = errors.map(
              (err) =>
                `${err.ruleId}: ${err.message} (line ${err.line}, col ${err.column})`,
            )
            throw new Error(
              `Valid fixture ${category.name}/${file} has linting errors:\n${errorMessages.join('\n')}`,
            )
          }

          expect(errors.length).toBe(0)
        }
      }
    })
  })

  describe('Invalid Fixtures', () => {
    it('should report errors for all invalid fixtures', async () => {
      const config = await defineConfig({
        presets: {
          ignores: false,
          javascript: true,
          prettier: true,
          tailwindcss: true,
          typescript: false,
          react: {
            options: {
              version: '18.3',
            },
          },
        },
      })

      const eslint = new ESLint({
        overrideConfig: config,
        overrideConfigFile: true,
      })

      const invalidFixturesPath = join(process.cwd(), 'tests/fixtures/invalid')
      const categories = await readdir(invalidFixturesPath, {
        withFileTypes: true,
      })

      for (const category of categories) {
        if (!category.isDirectory()) continue

        const categoryPath = join(invalidFixturesPath, category.name)
        const files = await readdir(categoryPath)

        for (const file of files) {
          if (file.endsWith('.errors.json')) continue

          const filePath = join(categoryPath, file)
          const results = await eslint.lintFiles([filePath])

          const errors = results.flatMap((result) =>
            result.messages.filter((msg) => msg.severity === 2),
          )

          if (errors.length === 0) {
            throw new Error(
              `Invalid fixture ${category.name}/${file} should have linting errors but has none`,
            )
          }

          const errorsFilePath = join(categoryPath, `${file}.errors.json`)
          try {
            const expectedErrorsContent = await readFile(
              errorsFilePath,
              'utf-8',
            )
            const expectedErrors = JSON.parse(expectedErrorsContent)

            for (const expectedError of expectedErrors) {
              const found = errors.some(
                (err) => err.ruleId === expectedError.ruleId,
              )
              if (!found) {
                throw new Error(
                  `Invalid fixture ${category.name}/${file} is missing expected error for rule: ${expectedError.ruleId}`,
                )
              }
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (err: any) {
            if (err.code !== 'ENOENT') {
              throw err
            }
          }

          expect(errors.length).toBeGreaterThan(0)
        }
      }
    })
  })
})
