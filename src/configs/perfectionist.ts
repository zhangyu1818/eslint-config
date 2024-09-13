import pluginPerfectionist from 'eslint-plugin-perfectionist'

import type { FlatESLintConfig, RulesOverrides } from '../types'

export function perfectionist(overrides: RulesOverrides): FlatESLintConfig[] {
  return [
    {
      plugins: {
        perfectionist: pluginPerfectionist,
      },
      rules: {
        'perfectionist/sort-classes': [
          'error',
          {
            groups: [
              'static-property',
              'index-signature',
              'private-property',
              'property',
              'constructor',
              'static-private-method',
              'static-method',
              ['get-method', 'set-method'],
              'private-method',
              'method',
              'unknown',
            ],
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-imports': [
          'error',
          {
            customGroups: {
              type: {
                next: ['next', 'next/**'],
                react: ['react', 'react-dom{,/*}'],
              },
              value: {
                next: ['next', 'next/**'],
                react: ['react', 'react-dom{,/*}'],
              },
            },
            groups: [
              'builtin',
              'external',
              'next',
              'react',
              'internal',
              'object',
              ['index', 'sibling', 'parent'],
              'builtin-type',
              'external-type',
              'internal-type',
              ['index-type', 'sibling-type', 'parent-type'],
              'style',
              'side-effect',
              'side-effect-style',
              'unknown',
            ],
            internalPattern: ['@/**'],
            newlinesBetween: 'always',
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-interfaces': [
          'error',
          {
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-intersection-types': [
          'error',
          {
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-maps': [
          'error',
          {
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-named-exports': [
          'error',
          {
            groupKind: 'values-first',
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-named-imports': [
          'error',
          {
            groupKind: 'values-first',
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-object-types': [
          'error',
          {
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-objects': [
          'error',
          {
            customGroups: {
              id: 'id',
            },
            groups: ['id', 'unknown'],
            order: 'asc',
            partitionByComment: 'Part:**',
            type: 'natural',
          },
        ],
        'perfectionist/sort-union-types': [
          'error',
          {
            order: 'asc',
            type: 'natural',
          },
        ],
        ...overrides,
      },
      settings: {
        perfectionist: {
          ignoreCase: false,
        },
      },
    },
  ]
}
