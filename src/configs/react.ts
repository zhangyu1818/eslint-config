// @ts-expect-error - no types
import * as eslintPluginJSXA11y from 'eslint-plugin-jsx-a11y'
// @ts-expect-error - no types
import * as eslintPluginReact from 'eslint-plugin-react'
// @ts-expect-error - no types
import * as eslintPluginReactHook from 'eslint-plugin-react-hooks'
// @ts-expect-error - no types
import * as eslintPluginReactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

import { GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX } from '../globs'
import { interopDefault } from '../utils'

import type {
  FlatESLintConfig,
  ReactOptions,
  RulesOverrides,
  TsParserOptions,
} from '../types'

const pluginReact = interopDefault(eslintPluginReact)
const pluginReactHook = interopDefault(eslintPluginReactHook)
const pluginReactRefresh = interopDefault(eslintPluginReactRefresh)
const pluginJSXA11y = interopDefault(eslintPluginJSXA11y)

export function react(
  overrides: RulesOverrides,
  parserOptions: TsParserOptions,
  options: ReactOptions = {},
): FlatESLintConfig[] {
  const {
    a11y = true,
    framework: { next: isUsingNext, vite: isUsingVite } = {},
  } = options

  return [
    {
      files: [GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX],
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          jsxPragma: null,
          ...parserOptions,
        },
        sourceType: 'module',
      },
      plugins: {
        'jsx-a11y': pluginJSXA11y,
        react: pluginReact,
        'react-hooks': pluginReactHook,
        'react-refresh': pluginReactRefresh,
      },
      rules: {
        ...(a11y ? pluginJSXA11y.flatConfigs.recommended.rules : {}),
        'react/function-component-definition': [
          'error',
          {
            namedComponents: ['arrow-function', 'function-declaration'],
            unnamedComponents: 'arrow-function',
          },
        ],
        'react/jsx-boolean-value': 'error',
        'react/jsx-closing-bracket-location': 'error',
        'react/jsx-curly-brace-presence': [
          'error',
          { children: 'never', propElementValues: 'always', props: 'never' },
        ],
        'react/jsx-curly-newline': 'error',
        'react/jsx-curly-spacing': 'error',
        'react/jsx-equals-spacing': 'error',
        'react/jsx-key': 'error',
        'react/jsx-no-comment-textnodes': 'error',
        'react/jsx-no-duplicate-props': 'error',
        'react/jsx-no-target-blank': 'error',
        'react/jsx-no-undef': 'error',
        'react/jsx-no-useless-fragment': 'error',
        'react/jsx-sort-props': [
          'error',
          {
            callbacksLast: true,
            multiline: 'ignore',
            reservedFirst: true,
            shorthandFirst: true,
          },
        ],
        'react/jsx-uses-react': 'off',
        'react/jsx-uses-vars': 'error',
        'react/jsx-wrap-multilines': 'error',
        'react/no-array-index-key': 'warn',
        'react/no-children-prop': 'error',
        'react/no-danger-with-children': 'error',
        'react/no-deprecated': 'error',
        'react/no-direct-mutation-state': 'error',
        'react/no-find-dom-node': 'error',
        'react/no-is-mounted': 'error',
        'react/no-render-return-value': 'error',
        'react/no-string-refs': 'error',
        'react/no-unescaped-entities': 'error',
        'react/no-unknown-property': 'error',
        'react/no-unstable-nested-components': 'error',
        'react/react-in-jsx-scope': 'off',
        'react/require-render-return': 'error',
        'react/self-closing-comp': [
          'error',
          {
            component: true,
            html: true,
          },
        ],
        'react/void-dom-elements-no-children': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react-hooks/rules-of-hooks': 'error',
        // react refresh
        'react-refresh/only-export-components': [
          'warn',
          {
            allowConstantExport: isUsingVite,
            allowExportNames: [
              ...(isUsingNext
                ? [
                    'config',
                    'generateStaticParams',
                    'metadata',
                    'generateMetadata',
                    'viewport',
                    'generateViewport',
                  ]
                : []),
            ],
          },
        ],
        ...overrides,
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
  ]
}
