import type { Morax } from "@hazae41/morax"
import { Result } from "@hazae41/result"
import { Adapter } from "./keccak256.js"

export function fromMorax(morax: typeof Morax): Adapter {

  class Hasher {

    constructor(
      readonly inner: Morax.Keccak256Hasher
    ) { }

    [Symbol.dispose]() {
      this.inner.free()
    }

    static new(inner: Morax.Keccak256Hasher) {
      return new Hasher(inner)
    }

    static tryNew() {
      return Result.runAndDoubleWrapSync(() => new morax.Keccak256Hasher()).mapSync(Hasher.new)
    }

    tryUpdate(bytes: Uint8Array) {
      return Result.runAndDoubleWrapSync(() => this.inner.update(bytes))
    }

    tryFinalize() {
      return Result.runAndDoubleWrapSync(() => this.inner.finalize())
    }

  }

  function tryHash(bytes: Uint8Array) {
    return Result.runAndDoubleWrapSync(() => morax.keccak256(bytes))
  }

  return { Hasher, tryHash }
}