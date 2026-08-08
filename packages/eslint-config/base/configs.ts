import eslintJs from '@eslint/js'
import stylisticPlugin from '@stylistic/eslint-plugin'
import { defineConfig } from 'eslint/config'
import eslintConfigTurbo from 'eslint-config-turbo/flat'
import { flatConfigs as importXFlatConfigs } from 'eslint-plugin-import-x'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'
// @ts-expect-error Could not find a declaration file for module 'eslint-plugin-promise'.
import eslintPluginPromise from 'eslint-plugin-promise'
import { configs as typescriptEslintConfigs } from 'typescript-eslint'

export const configs = defineConfig([
  eslintConfigTurbo,
  eslintJs.configs.recommended,
  importXFlatConfigs.recommended,
  importXFlatConfigs.typescript,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  eslintPluginPromise.configs['flat/recommended'],
  stylisticPlugin.configs['disable-legacy'],
  stylisticPlugin.configs.recommended,
  typescriptEslintConfigs.strictTypeChecked,
  typescriptEslintConfigs.stylisticTypeChecked,
  eslintPluginPrettier
])
