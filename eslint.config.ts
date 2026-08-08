import { makeUpConfig } from '@logitrack/eslint-config'

export default makeUpConfig({
  customConfig: { ignores: ['apps', 'packages'] },
  files: ['./*{js,ts}', 'scripts/**/*.ts'],
  packageDirectory: import.meta.dirname
})
