import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import sortJson from 'sort-json'

import { PACKAGE_JSON } from './constants.ts'

export const writePackageJson = (
  content: object,
  packageRoot: string
): void => {
  const space = 2

  writeFileSync(
    join(packageRoot, PACKAGE_JSON),
    JSON.stringify(sortJson(content), null, space)
  )
}
