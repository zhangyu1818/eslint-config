import { tsImport } from 'tsx/esm/api'

const { defineConfig } = await tsImport('./src/index.ts', import.meta.url)

export default defineConfig({
    comments: true,
    ignores: true,
    imports: true,
    javascript: true,
    jsonc: true,
    jsx: true,
    next: true,
    node: true,
    perfectionist: true,
    prettier: true,
    react: true,
    regexp: true,
    sort: true,
    tailwindcss: true,
    test: true,
    typescript: true,
    unicorn: true
})
