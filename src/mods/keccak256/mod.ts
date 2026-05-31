import { sha3Wasm } from "@hazae41/sha3-wasm";

await sha3Wasm.load()

export function digest(payload: Uint8Array): Uint8Array<ArrayBuffer> {
  const { Memory } = sha3Wasm

  const result = sha3Wasm.keccak256(new Memory(payload))

  return new Uint8Array(result.bytes)
}

export class Hasher {

  constructor(
    readonly inner = new sha3Wasm.Keccak256Hasher()
  ) { }

  clone(): Hasher {
    return new Hasher(this.inner.clone())
  }

  update(data: Uint8Array): this {
    const { Memory } = sha3Wasm

    this.inner.update(new Memory(data))

    return this
  }

  finalize(): Uint8Array<ArrayBuffer> {
    return new Uint8Array(this.inner.finalize().bytes)
  }

}