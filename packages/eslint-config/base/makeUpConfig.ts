import type { ConfigObject } from 'eslint/config'
import type { ReadonlyDeep } from 'type-fest'
import type { TFilesR } from './withFiles'

import { defineConfig } from 'eslint/config'

import { configs } from './configs'
import { includeGitignore } from './includeGitignore'
import { withFiles } from './withFiles'

type TCustomConfig = ConfigObject | ConfigObject[]

export type TMakeUpConfigParams = ReadonlyDeep<{
  customConfig?: TCustomConfig
  files?: TFilesR
  packageDirectory?: string
}>

export const makeUpConfig = (
  params?: TMakeUpConfigParams
): ReturnType<typeof defineConfig> => {
  const {
    customConfig = {},
    files = ['**/*.{js,ts}'],
    packageDirectory
  } = params ?? {}

  const gitignore =
    packageDirectory === undefined ? {} : includeGitignore(packageDirectory)

  return defineConfig(
    configs,
    gitignore,
    withFiles(files),
    customConfig as TCustomConfig
  )
}
