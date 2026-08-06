import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { PACKAGE_JSON } from './constants.ts'

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const readPackageJson = <T>(packageRoot: string): T => {
  return JSON.parse(readFileSync(join(packageRoot, PACKAGE_JSON), 'utf-8')) as T
}
