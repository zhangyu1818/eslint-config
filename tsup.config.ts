import { defineConfig } from 'tsup'

export default defineConfig({
  // fix @next/eslint-plugin-next dynamic require error
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  format: 'esm',
  banner: {
    js: "import { createRequire } from 'module'; const require = createRequire(import.meta.url);",
  },
})
