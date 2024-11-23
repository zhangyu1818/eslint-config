import tseslint from 'typescript-eslint'

import { GLOB_TS, GLOB_TSX } from '../globs'

import type {
  FlatESLintConfig,
  RulesOverrides,
  TsParserOptions,
} from '../types'

export function typescript(
  overrides: RulesOverrides = {},
  parserOptions: TsParserOptions,
): FlatESLintConfig[] {
  return [
    {
      files: [GLOB_TS, GLOB_TSX],
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
          ...parserOptions,
          sourceType: 'module',
        },
      },
      plugins: {
        // @ts-expect-error - types not correct
        '@typescript-eslint': tseslint.plugin,
      },
      rules: {
        '@typescript-eslint/adjacent-overload-signatures': 'off',
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/await-thenable': 'warn',
        '@typescript-eslint/consistent-generic-constructors': 'error',
        '@typescript-eslint/consistent-indexed-object-style': 'error',
        '@typescript-eslint/consistent-type-definitions': 'warn',
        '@typescript-eslint/explicit-member-accessibility': 'error',
        '@typescript-eslint/method-signature-style': 'error',
        '@typescript-eslint/no-array-constructor': 'error',
        '@typescript-eslint/no-array-delete': 'error',
        '@typescript-eslint/no-base-to-string': 'error',
        '@typescript-eslint/no-duplicate-enum-values': 'error',
        '@typescript-eslint/no-duplicate-type-constituents': 'error',
        '@typescript-eslint/no-dynamic-delete': 'error',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-empty-object-type': 'error',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-extra-non-null-assertion': 'error',
        '@typescript-eslint/no-extraneous-class': 'error',
        '@typescript-eslint/no-for-in-array': 'error',
        '@typescript-eslint/no-import-type-side-effects': 'error',
        '@typescript-eslint/no-invalid-void-type': 'error',
        '@typescript-eslint/no-loss-of-precision': 'error',
        '@typescript-eslint/no-meaningless-void-operator': 'error',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-misused-promises': 'error',
        '@typescript-eslint/no-mixed-enums': 'error',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-redundant-type-constituents': 'error',
        '@typescript-eslint/no-this-alias': 'error',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
        '@typescript-eslint/no-unnecessary-condition': 'error',
        '@typescript-eslint/no-unnecessary-template-expression': 'error',
        '@typescript-eslint/no-unnecessary-type-arguments': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        '@typescript-eslint/no-unnecessary-type-constraint': 'error',
        '@typescript-eslint/no-unsafe-declaration-merging': 'error',
        '@typescript-eslint/no-unsafe-function-type': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/no-useless-empty-export': 'error',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/no-wrapper-object-types': 'error',
        '@typescript-eslint/non-nullable-type-assertion-style': 'error',
        '@typescript-eslint/only-throw-error': 'error',
        '@typescript-eslint/prefer-as-const': 'error',
        '@typescript-eslint/prefer-literal-enum-member': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/triple-slash-reference': 'warn',
        '@typescript-eslint/unified-signatures': 'error',
        'no-array-constructor': 'off',
        'no-loss-of-precision': 'off',
        'no-throw-literal': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'no-useless-constructor': 'off',
        '@typescript-eslint/ban-ts-comment': [
          'error',
          {
            minimumDescriptionLength: 3,
            'ts-check': false,
            'ts-expect-error': 'allow-with-description',
            'ts-ignore': true,
            'ts-nocheck': true,
          },
        ],
        '@typescript-eslint/consistent-type-exports': [
          'error',
          {
            fixMixedExportsWithInlineTypeSpecifier: true,
          },
        ],
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            disallowTypeAnnotations: false,
            fixStyle: 'separate-type-imports',
            prefer: 'type-imports',
          },
        ],
        ...overrides,
      },
    },
    {
      files: ['**/*.d.([cm])ts'],
      rules: {
        'eslint-comments/no-unlimited-disable': 'off',
        'import/no-duplicates': 'off',
        'no-restricted-syntax': 'off',
        'unused-imports/no-unused-vars': 'off',
      },
    },
    {
      files: ['**/*.{test,spec}.ts?(x)'],
      rules: {
        'no-unused-expressions': 'off',
      },
    },
    {
      files: ['**/*.js', '**/*.cjs'],
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ]
}
