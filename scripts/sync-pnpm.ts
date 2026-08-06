import type { IPackageJson as IPackageJsonBase } from '@logitrack/shared/types'
import type { PartialDeep } from 'type-fest'

import { exitScript } from '@logitrack/shared/scriptHelpers'
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sortJson from 'sort-json'

interface IPackageJson extends PartialDeep<IPackageJsonBase> {
  packageManager: string
}

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const fileName = 'package.json'
const path = resolve(root, fileName)
const packageJson = JSON.parse(readFileSync(path, 'utf-8')) as IPackageJson

const ar = new RegExp(/pnpm@([^+\s]+)/).exec(packageJson.packageManager)
const pnpmVersion = ar?.[1] ?? ''

if (!pnpmVersion) {
  exitScript("Can't get pnpm version from 'packageManager'")
}

packageJson.engines ??= {}

if (packageJson.engines.pnpm !== pnpmVersion) {
  packageJson.engines.pnpm = pnpmVersion

  const space = 2
  writeFileSync(path, JSON.stringify(sortJson(packageJson), null, space))

  execSync(`git add ${fileName}`)
}
