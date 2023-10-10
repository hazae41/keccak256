import { Box, Copiable } from "@hazae41/box"
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
  tryUpdate(bytes: Box<Copiable>): Result<void, UpdateError>
  tryFinalize(): Result<Copiable, FinalizeError>
}

export interface HasherFactory {
  tryNew(): Result<Hasher, CreateError>
}


export interface Adapter {
  readonly Hasher: HasherFactory

  tryHash(bytes: Box<Copiable>): Result<Copiable, HashError>
}

