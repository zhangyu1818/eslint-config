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
            newlinesBetween: 1,
            order: 'asc',
            type: 'natural',
            customGroups: [
              {
                elementNamePattern: ['^next$', '^next/.*$'],
                groupName: 'next',
              },
              {
                elementNamePattern: ['^react$', '^react-dom(/.*)?$'],
                groupName: 'react',
              },
              {
                elementNamePattern: ['^three$', '^three/.*$'],
                groupName: 'three',
              },
              {
                elementNamePattern: ['^@react-three/.*$'],
                groupName: 'reactThree',
              },
            ],
            groups: [
              'value-builtin',
              'next',
              'react',
              'three',
              'reactThree',
              'value-external',
              'value-internal',
              ['value-index', 'value-sibling', 'value-parent'],
              'type-builtin',
              'type-external',
              'type-internal',
              ['type-index', 'type-sibling', 'type-parent'],
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
            groups: ['value-export', 'type-export'],
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-named-imports': [
          'error',
          {
            groups: ['value-import', 'type-import'],
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
            groups: ['top', 'unknown', 'multiline-member', 'method'],
            order: 'asc',
            partitionByComment: true,
            partitionByNewLine: true,
            type: 'natural',
            customGroups: [
              {
                elementNamePattern: ['^id$', '^name$', '^key$'],
                groupName: 'top',
              },
            ],
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
