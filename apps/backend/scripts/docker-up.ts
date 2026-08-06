import type { IPackageJson } from '@logitrack/shared/types'

import { exitScript } from '@logitrack/shared/scriptHelpers'
import { findUpSync } from 'find-up-simple'
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { packageDirectorySync } from 'pkg-dir'

const root = dirname(findUpSync('pnpm-lock.yaml') ?? '')

if (root === '.') {
  exitScript('Workspace root not found')
}

const packageDirectory =
  packageDirectorySync({ cwd: import.meta.dirname }) ?? ''

if (!packageDirectory) {
  exitScript('Package root not found')
}

const packageJson = JSON.parse(
  readFileSync(join(root, 'package.json'), 'utf-8')
) as IPackageJson

const { NODE_ENV = 'dev' } = process.env

let composeYaml = join(packageDirectory, `compose.${NODE_ENV}.yaml`)

const buf = execSync(`docker compose -f ${composeYaml} config`, {
  env: {
    ...process.env,
    BACKEND_DIR: relative(root, packageDirectory),
    PNPM_VERSION: packageJson.engines.pnpm,
    ROOT: '/app'
  }
})

composeYaml = 'compose.yaml'

const file = join(packageDirectory, composeYaml)

writeFileSync(file, buf.toString())

execSync(`docker compose -f ${composeYaml} up`, {
  stdio: 'inherit'
})
