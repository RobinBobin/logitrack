import baseConfig, { includeGitignore } from '@logitrack/eslint-config'
import { defineConfig } from 'eslint/config'

export default defineConfig([baseConfig, includeGitignore(import.meta.url)])
