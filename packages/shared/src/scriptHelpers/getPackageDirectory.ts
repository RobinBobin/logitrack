import { packageDirectorySync } from 'package-directory'

import { exitScript } from './exitScript.ts'

export const getPackageDirectory = (cwd: string): string => {
  const packageDirectory = packageDirectorySync({ cwd }) ?? ''

  if (!packageDirectory) {
    exitScript('Package root not found')
  }

  return packageDirectory
}
