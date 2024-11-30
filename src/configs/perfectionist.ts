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
            order: 'asc',
            type: 'natural',
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
          },
        ],
        'perfectionist/sort-imports': [
          'error',
          {
            internalPattern: ['^@/.*', '^~/.*'],
            newlinesBetween: 'always',
            order: 'asc',
            type: 'natural',
            customGroups: {
              type: {
                next: ['^next$', '^next/.*$'],
                react: ['^react$', '^react-dom(/.*)?$'],
                reactThree: ['^@react-three/.*$'],
                three: ['^three$', '^three/.*$'],
              },
              value: {
                next: ['^next$', '^next/.*$'],
                react: ['^react$', '^react-dom(/.*)?$'],
                reactThree: ['^@react-three/.*$'],
                three: ['^three$', '^three/.*$'],
              },
            },
            groups: [
              'builtin',
              'next',
              'react',
              'three',
              'reactThree',
              'external',
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
            groups: ['top', 'unknown','multiline', 'method'],
            order: 'asc',
            partitionByComment: true,
            partitionByNewLine: true,
            type: 'natural',
            customGroups: {
              top: ['^id$', '^name$', '^key$'],
            },
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
