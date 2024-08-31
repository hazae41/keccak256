import Sha3Noble from "@noble/hashes/sha3"
import { BytesOrCopiable, Copied } from "libs/copiable/index.js"
import { Adapter, Output } from "./adapter.js"

export function fromNoble(noble: typeof Sha3Noble) {
  const { keccak_256 } = noble

  function getBytes(bytes: BytesOrCopiable) {
    return "bytes" in bytes ? bytes.bytes : bytes
  }

  class Hasher {

    constructor(
      readonly inner: ReturnType<typeof Sha3Noble.keccak_256.create>
    ) { }

    [Symbol.dispose]() { }

    static create(inner: ReturnType<typeof Sha3Noble.keccak_256.create>) {
      return new Hasher(inner)
    }

    static createOrThrow() {
      return new Hasher(keccak_256.create())
    }

    cloneOrThrow() {
      return new Hasher(this.inner.clone())
    }

    updateOrThrow(bytes: BytesOrCopiable) {
      this.inner.update(getBytes(bytes))
      return this
    }

    finalizeOrThrow() {
      return new Copied(this.inner.clone().digest()) as Copied<Output>
    }

  }

  function hashOrThrow(bytes: BytesOrCopiable) {
    return new Copied(keccak_256(getBytes(bytes))) as Copied<Output>
  }

  return { Hasher, hashOrThrow } satisfies Adapter
}