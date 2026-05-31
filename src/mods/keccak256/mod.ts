import { sha3Wasm } from "@hazae41/sha3-wasm";

await sha3Wasm.load()

export function digest(payload: Uint8Array) {
  const { Memory } = sha3Wasm

  const result = sha3Wasm.keccak256(new Memory(payload))

  return new Uint8Array(result.bytes)
}

export class Hasher {

  constructor(
    readonly inner = new sha3Wasm.Keccak256Hasher()
  ) { }

  clone() {
    return new Hasher(this.inner.clone())
  }

  update(data: Uint8Array) {
    const { Memory } = sha3Wasm

    this.inner.update(new Memory(data))

    return this
  }

  finalize() {
    return new Uint8Array(this.inner.finalize().bytes)
  }

}