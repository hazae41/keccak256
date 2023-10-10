import { Box, Copiable } from "@hazae41/box"
import { Morax } from "@hazae41/morax"
import { Result } from "@hazae41/result"
import { Adapter } from "./adapter.js"
import { CreateError, FinalizeError, HashError, UpdateError } from "./errors.js"

export async function fromMorax(): Promise<Adapter> {
  await Morax.initBundledOnce()

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
      return Result.runAndDoubleWrapSync(() => new Morax.Keccak256Hasher()).mapSync(Hasher.new).mapErrSync(CreateError.from)
    }

    tryUpdate(bytes: Box<Copiable>) {
      return Result.runAndDoubleWrapSync(() => this.inner.update(bytes)).mapErrSync(UpdateError.from)
    }

    tryFinalize() {
      return Result.runAndDoubleWrapSync(() => this.inner.finalize()).mapErrSync(FinalizeError.from)
    }

  }

  function tryHash(bytes: Box<Copiable>) {
    return Result.runAndDoubleWrapSync(() => Morax.keccak256(bytes)).mapErrSync(HashError.from)
  }

  return { Hasher, tryHash }
}