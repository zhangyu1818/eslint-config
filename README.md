# @zhangyu1818/eslint-config

Very opinionated Flat ESLint Config, but supports rules overrides.

Support ESLint `^8.57.0` for `React`, `Next.js`, `TailwindCSS`, `Prettier`.

## Usage

```shell
pnpm i @zhangyu1818/eslint-config -D
```

```js
// esling.config.js or esling.config.msj
import { defineConfig } from '@zhangyu1818/eslint-config'

export default defineConfig()
```

## API

```ts
import { FlatESLintConfig } from 'eslint-define-config'

type RulesOverrides = FlatESLintConfig['rules']

interface TsParserOptions {
  project?: boolean | string | string[]
  tsconfigRootDir?: string
}

interface ReactFrameworkOptions {
  next?: boolean
  vite?: boolean
}

interface Presets {
  comments?: RulesOverrides | boolean
  ignores?: boolean
  imports?: RulesOverrides | boolean
  javascript?: RulesOverrides | boolean
  jsonc?: RulesOverrides | boolean
  jsx?: boolean
  next?: RulesOverrides | boolean
  node?: RulesOverrides | boolean
  perfectionist?: RulesOverrides | boolean
  prettier?: RulesOverrides | boolean
  react?: RulesOverrides | boolean
  regexp?: RulesOverrides | boolean
  sort?: boolean
  tailwindcss?: RulesOverrides | boolean
  test?: RulesOverrides | boolean
  typescript?: RulesOverrides | boolean
  unicorn?: RulesOverrides | boolean
}

interface Options {
  parserOptions?: TsParserOptions
  presets?: Presets
  reactFramework?: ReactFrameworkOptions
}

declare function defineConfig(
  options?: Options,
  userConfigs?: FlatESLintConfig[],
): FlatESLintConfig[]
```

---

## TODO

- [ ] Upgrade to ESLint v9, currently some plugins do not support ESLint v9.
- [ ] Change the configuration to dynamic on-demand imports to reduce dependencies of this package.
- [ ] Add CLI tool.
- [ ] Optimize packaging.

---

This project heavily references [@antfu/eslint-config](https://github.com/antfu/eslint-config). Thanks to [Anthony Fu](https://github.com/antfu) for the outstanding contributions to open source.
