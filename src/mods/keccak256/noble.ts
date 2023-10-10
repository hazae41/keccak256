import { Box, Copiable, Copied } from "@hazae41/box"
import { Result } from "@hazae41/result"
import { keccak_256 } from "@noble/hashes/sha3"
import { Adapter } from "./adapter.js"
import { CreateError, FinalizeError, HashError, UpdateError } from "./errors.js"

export function fromNoble(): Adapter {

  class Hasher {

    constructor(
      readonly inner: ReturnType<typeof keccak_256.create>
    ) { }

    [Symbol.dispose]() { }

    static new(inner: ReturnType<typeof keccak_256.create>) {
      return new Hasher(inner)
    }

    static tryNew() {
      return Result.runAndDoubleWrapSync(() => keccak_256.create()).mapSync(Hasher.new).mapErrSync(CreateError.from)
    }

    tryUpdate(bytes: Box<Copiable>) {
      return Result.runAndDoubleWrapSync(() => this.inner.update(bytes.get().bytes)).clear().mapErrSync(UpdateError.from)
    }

    tryFinalize() {
      return Result.runAndDoubleWrapSync(() => this.inner.clone().digest()).mapSync(Copied.new).mapErrSync(FinalizeError.from)
    }

  }

  function tryHash(bytes: Box<Copiable>) {
    return Result.runAndDoubleWrapSync(() => keccak_256(bytes.get().bytes)).mapSync(Copied.new).mapErrSync(HashError.from)
  }

  return { Hasher, tryHash }
}