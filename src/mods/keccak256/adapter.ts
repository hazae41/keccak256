import { None, Nullable, Option } from "@hazae41/option"
import { BytesOrCopiable, Copiable } from "libs/copiable/index.js"

let global: Option<Adapter> = new None()

export function get() {
  return global
}

export function set(value: Nullable<Adapter>) {
  global = Option.wrap(value)
}

export type Output = Uint8Array & { readonly length: 32 }

export interface Hasher extends Disposable {
  cloneOrThrow(): Hasher

  updateOrThrow(bytes: BytesOrCopiable): this

  finalizeOrThrow(): Copiable<Output>
}

export interface HasherFactory {
  createOrThrow(): Hasher
}

export interface Adapter {
  readonly Hasher: HasherFactory

  hashOrThrow(bytes: BytesOrCopiable): Copiable<Output>
}
