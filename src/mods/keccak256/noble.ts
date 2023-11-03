import { BytesOrCopiable, Copied } from "@hazae41/box"
import { Result } from "@hazae41/result"
import { keccak_256 } from "@noble/hashes/sha3"
import { Adapter, Output } from "./adapter.js"
import { CreateError, FinalizeError, HashError, UpdateError } from "./errors.js"

export function fromNoble(): Adapter {

  function getBytes(bytes: BytesOrCopiable) {
    return "bytes" in bytes ? bytes.bytes : bytes
  }

  class Hasher {

    constructor(
      readonly inner: ReturnType<typeof keccak_256.create>
    ) { }

    [Symbol.dispose]() { }

    static new(inner: ReturnType<typeof keccak_256.create>) {
      return new Hasher(inner)
    }

    static newOrThrow() {
      return new Hasher(keccak_256.create())
    }

    static tryNew() {
      return Result.runAndDoubleWrapSync(() => {
        return Hasher.newOrThrow()
      }).mapErrSync(CreateError.from)
    }

    updateOrThrow(bytes: BytesOrCopiable) {
      this.inner.update(getBytes(bytes))
      return this
    }

    tryUpdate(bytes: BytesOrCopiable) {
      return Result.runAndDoubleWrapSync(() => {
        return this.updateOrThrow(bytes)
      }).mapErrSync(UpdateError.from)
    }

    finalizeOrThrow() {
      return new Copied(this.inner.clone().digest()) as Copied<Output>
    }

    tryFinalize() {
      return Result.runAndDoubleWrapSync(() => {
        return this.finalizeOrThrow() as Copied<Output>
      }).mapErrSync(FinalizeError.from)
    }

  }

  function hashOrThrow(bytes: BytesOrCopiable) {
    return new Copied(keccak_256(getBytes(bytes))) as Copied<Output>
  }

  function tryHash(bytes: BytesOrCopiable) {
    return Result.runAndDoubleWrapSync(() => {
      return hashOrThrow(bytes) as Copied<Output>
    }).mapErrSync(HashError.from)
  }

  return { Hasher, hashOrThrow, tryHash }
}