import { findUpSync } from 'find-up-simple'
import { dirname } from 'node:path'

import { exitScript } from './exitScript.ts'

export const getRootDirectory = (): string => {
  const root = dirname(findUpSync('pnpm-lock.yaml') ?? '')

  if (root === '.') {
    exitScript('Workspace root not found')
  }

  return root
}
