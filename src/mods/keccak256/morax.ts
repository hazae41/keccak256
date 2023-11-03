import { Box, BytesOrCopiable, Copiable } from "@hazae41/box"
import { Morax } from "@hazae41/morax"
import { Result } from "@hazae41/result"
import { Adapter, Output } from "./adapter.js"
import { CreateError, FinalizeError, HashError, UpdateError } from "./errors.js"

export async function fromMorax(): Promise<Adapter> {
  await Morax.initBundledOnce()

  function getMemory(bytesOrCopiable: BytesOrCopiable) {
    if (bytesOrCopiable instanceof Morax.Memory)
      return Box.greedy(bytesOrCopiable)
    if (bytesOrCopiable instanceof Uint8Array)
      return Box.new(new Morax.Memory(bytesOrCopiable))
    return Box.new(new Morax.Memory(bytesOrCopiable.bytes))
  }

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

    static newOrThrow() {
      return new Hasher(new Morax.Keccak256Hasher())
    }

    static tryNew() {
      return Result.runAndDoubleWrapSync(() => {
        return Hasher.newOrThrow()
      }).mapErrSync(CreateError.from)
    }

    updateOrThrow(bytes: BytesOrCopiable) {
      using memory = getMemory(bytes)
      this.inner.update(memory.inner)
      return this
    }

    tryUpdate(bytes: BytesOrCopiable) {
      using memory = getMemory(bytes)

      return Result.runAndDoubleWrapSync(() => {
        this.inner.update(memory.inner)
        return this
      }).mapErrSync(UpdateError.from)
    }

    finalizeOrThrow() {
      return this.inner.finalize() as Copiable<Output>
    }

    tryFinalize() {
      return Result.runAndDoubleWrapSync(() => {
        return this.inner.finalize() as Copiable<Output>
      }).mapErrSync(FinalizeError.from)
    }

  }

  function hashOrThrow(bytes: BytesOrCopiable) {
    using memory = getMemory(bytes)
    const output = Morax.keccak256(memory.inner)
    return output as Copiable<Output>
  }

  function tryHash(bytes: BytesOrCopiable) {
    using memory = getMemory(bytes)

    return Result.runAndDoubleWrapSync(() => {
      return Morax.keccak256(memory.inner) as Copiable<Output>
    }).mapErrSync(HashError.from)
  }

  return { Hasher, hashOrThrow, tryHash }
}