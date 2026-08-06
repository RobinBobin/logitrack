import type { ReadonlyDeep } from 'type-fest'

interface IPackageJson {
  engines: {
    pnpm: string
  }
}

type TPackageJsonR = ReadonlyDeep<IPackageJson>

export type { IPackageJson, TPackageJsonR }
