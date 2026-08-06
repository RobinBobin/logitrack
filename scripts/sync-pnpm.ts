import type { IPackageJson as IPackageJsonBase } from '@logitrack/shared/scriptHelpers'
import type { PartialDeep } from 'type-fest'

import {
  exitScript,
  getRootDirectory,
  PACKAGE_JSON,
  readPackageJson,
  writePackageJson
} from '@logitrack/shared/scriptHelpers'
import { execSync } from 'node:child_process'

interface IPackageJson extends PartialDeep<IPackageJsonBase> {
  packageManager: string
}

const rootDirectory = getRootDirectory()
const packageJson = readPackageJson<IPackageJson>(rootDirectory)
const ar = new RegExp(/pnpm@([^+\s]+)/).exec(packageJson.packageManager)
const pnpmVersion = ar?.[1] ?? ''

if (!pnpmVersion) {
  exitScript("Can't get pnpm version from 'packageManager'")
}

packageJson.engines ??= {}

if (packageJson.engines.pnpm !== pnpmVersion) {
  packageJson.engines.pnpm = pnpmVersion

  writePackageJson(packageJson, rootDirectory)

  execSync(`git add ${PACKAGE_JSON}`)
}
