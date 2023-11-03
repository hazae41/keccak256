import { BytesOrCopiable, Copiable } from "@hazae41/box"
import { Nullable } from "@hazae41/option"
import { Result } from "@hazae41/result"
import { CreateError, FinalizeError, HashError, UpdateError } from "./errors.js"

let global: Nullable<Adapter> = undefined

export function get() {
  if (global == null)
    throw new Error("No Keccak256 adapter found")
  return global
}

export function set(value?: Nullable<Adapter>) {
  global = value
}

export type Output = Uint8Array & { length: 32 }

export interface Hasher extends Disposable {
  updateOrThrow(bytes: BytesOrCopiable): this
  tryUpdate(bytes: BytesOrCopiable): Result<this, UpdateError>

  finalizeOrThrow(): Copiable<Output>
  tryFinalize(): Result<Copiable<Output>, FinalizeError>
}

export interface HasherFactory {
  newOrThrow(): Hasher
  tryNew(): Result<Hasher, CreateError>
}

export interface Adapter {
  readonly Hasher: HasherFactory

  hashOrThrow(bytes: BytesOrCopiable): Copiable<Output>
  tryHash(bytes: BytesOrCopiable): Result<Copiable<Output>, HashError>
}
