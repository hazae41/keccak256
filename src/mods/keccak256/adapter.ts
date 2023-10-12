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
  tryUpdate(bytes: BytesOrCopiable): Result<this, UpdateError>
  tryFinalize(): Result<Copiable, FinalizeError>
}

export interface HasherFactory {
  tryNew(): Result<Hasher, CreateError>
}


export interface Adapter {
  readonly Hasher: HasherFactory

  tryHash(bytes: BytesOrCopiable): Result<Copiable, HashError>
}

