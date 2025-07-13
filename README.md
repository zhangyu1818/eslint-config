# @zhangyu1818/eslint-config

Very opinionated Flat ESLint Config, but supports rules overrides.

Support ESLint `^9` for `React`, `Next.js`, `TailwindCSS`, `Prettier`.

## Usage

```shell
pnpm i @zhangyu1818/eslint-config -D
```

```js
// esling.config.js or esling.config.mjs
import { defineConfig } from '@zhangyu1818/eslint-config'

export default defineConfig()
```

## API

```ts
import type { Linter } from 'eslint'

type FlatESLintConfig = Linter.Config
type RulesOverrides = Linter.Config['rules']

interface TsParserOptions {
  project?: boolean | string | string[]
  tsconfigRootDir?: string
}

interface ReactFrameworkOptions {
  next?: boolean
  vite?: boolean
}

interface ReactOptions {
  a11y?: boolean
  framework?: ReactFrameworkOptions
}

interface TailwindCSSOptions {
  entryPoint?: string
  tailwindConfig?: string
}

interface Presets {
  comments?: boolean | RulesOverrides
  ignores?: boolean
  imports?: boolean | RulesOverrides
  javascript?: boolean | RulesOverrides
  jsonc?: boolean | RulesOverrides
  jsx?: boolean
  next?: boolean | RulesOverrides
  node?: boolean | RulesOverrides
  perfectionist?: boolean | RulesOverrides
  prettier?: boolean | RulesOverrides
  react?: boolean | RulesOverrides
  regexp?: boolean | RulesOverrides
  sort?: boolean
  tailwindcss?: boolean | RulesOverrides
  test?: boolean | RulesOverrides
  typescript?: boolean | RulesOverrides
  unicorn?: boolean | RulesOverrides
}

interface Options {
  parserOptions?: TsParserOptions
  presets?: Presets
  reactOptions?: ReactOptions
  tailwindcssOptions?: TailwindCSSOptions
}

declare function defineConfig(
  options?: Options,
  userConfigs?: FlatESLintConfig[],
): Promise<FlatESLintConfig[]>
```

## Default presets

```typescript
const defaultPresets: Presets = {
  comments: true,
  ignores: true,
  imports: true,
  javascript: true,
  jsonc: true,
  jsx: true,
  perfectionist: true,
  regexp: true,
  sort: true,
  unicorn: true,
}
```

---

## TODO

- [x] Upgrade to ESLint v9, currently some plugins do not support ESLint v9.
- [ ] Change the configuration to dynamic on-demand imports to reduce dependencies of this package.
- [ ] Add CLI tool.
- [ ] Optimize packaging.

---

This project heavily references [@antfu/eslint-config](https://github.com/antfu/eslint-config). Thanks to [Anthony Fu](https://github.com/antfu) for the outstanding contributions to open source.
