import { Box } from "@hazae41/box"
import type { Keccak256Hasher, Sha3Wasm } from "@hazae41/sha3.wasm"
import { BytesOrCopiable, Copiable } from "libs/copiable/index.js"
import { Adapter, Output } from "./adapter.js"

export function fromWasm(wasm: typeof Sha3Wasm) {
  const { Memory, Keccak256Hasher, keccak256 } = wasm

  function getMemory(bytesOrCopiable: BytesOrCopiable) {
    if (bytesOrCopiable instanceof Memory)
      return Box.createAsMoved(bytesOrCopiable)
    if (bytesOrCopiable instanceof Uint8Array)
      return Box.create(new Memory(bytesOrCopiable))
    return Box.create(new Memory(bytesOrCopiable.bytes))
  }

  class Hasher {

    constructor(
      readonly inner: Keccak256Hasher
    ) { }

    [Symbol.dispose]() {
      using _ = this.inner
    }

    static create(inner: Keccak256Hasher) {
      return new Hasher(inner)
    }

    static createOrThrow() {
      return new Hasher(new Keccak256Hasher())
    }

    updateOrThrow(bytes: BytesOrCopiable) {
      using memory = getMemory(bytes)
      this.inner.update(memory.inner)
      return this
    }

    finalizeOrThrow() {
      return this.inner.finalize() as Copiable<Output>
    }

  }

  function hashOrThrow(bytes: BytesOrCopiable) {
    using memory = getMemory(bytes)
    const output = keccak256(memory.inner)
    return output as Copiable<Output>
  }

  return { Hasher, hashOrThrow } satisfies Adapter
}