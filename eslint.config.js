import { tsImport } from 'tsx/esm/api'

const { defineConfig } = await tsImport('./src/index.ts', import.meta.url)

export default defineConfig()
