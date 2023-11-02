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

export interface Hasher extends Disposable {
  updateOrThrow(bytes: BytesOrCopiable): this
  tryUpdate(bytes: BytesOrCopiable): Result<this, UpdateError>

  finalizeOrThrow(): Copiable
  tryFinalize(): Result<Copiable, FinalizeError>
}

export interface HasherFactory {
  newOrThrow(): Hasher
  tryNew(): Result<Hasher, CreateError>
}


export interface Adapter {
  readonly Hasher: HasherFactory

  hashOrThrow(bytes: BytesOrCopiable): Copiable
  tryHash(bytes: BytesOrCopiable): Result<Copiable, HashError>
}

