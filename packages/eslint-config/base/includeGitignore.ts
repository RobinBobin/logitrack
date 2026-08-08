import type { ConfigObject } from 'eslint/config'

import { includeIgnoreFile } from 'eslint/config'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

export const includeGitignore = (packageDirectory: string): ConfigObject => {
  const gitignore = join(packageDirectory, '.gitignore')

  return existsSync(gitignore) ? includeIgnoreFile(gitignore) : {}
}
