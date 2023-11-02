import { BytesOrCopiable, Copiable } from "@hazae41/box"
import { None, Option } from "@hazae41/option"
import { Result } from "@hazae41/result"
import { CreateError, FinalizeError, HashError, UpdateError } from "./errors.js"

let global: Option<Adapter> = new None()

export function get() {
  return global.unwrap()
}

export function set(value?: Adapter) {
  global = Option.wrap(value)
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

