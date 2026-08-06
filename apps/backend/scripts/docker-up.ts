import type { IPackageJson } from '@logitrack/shared/scriptHelpers'

import {
  getPackageDirectory,
  getRootDirectory,
  readPackageJson
} from '@logitrack/shared/scriptHelpers'
import { execSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'

const packageDirectory = getPackageDirectory(import.meta.dirname)
const rootDirectory = getRootDirectory()
const rootPackageJson = readPackageJson<IPackageJson>(rootDirectory)

const { NODE_ENV = 'dev' } = process.env

let composeYaml = join(packageDirectory, `compose.${NODE_ENV}.yaml`)

const buf = execSync(`docker compose -f ${composeYaml} config`, {
  env: {
    ...process.env,
    BACKEND_DIR: relative(rootDirectory, packageDirectory),
    PNPM_VERSION: rootPackageJson.engines.pnpm,
    ROOT: '/app'
  }
})

composeYaml = 'compose.yaml'

const file = join(packageDirectory, composeYaml)

writeFileSync(file, buf.toString())

execSync(`docker compose -f ${composeYaml} up`, {
  stdio: 'inherit'
})
