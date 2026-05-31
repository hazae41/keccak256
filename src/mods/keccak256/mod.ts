import { sha3Wasm } from "@hazae41/sha3-wasm";

await sha3Wasm.load()

/**
 * Digest the given data
 * @param data 
 * @returns 
 */
export function digest(data: Uint8Array): Uint8Array<ArrayBuffer> {
  const { Memory } = sha3Wasm

  const result = sha3Wasm.keccak256(new Memory(data))

  return new Uint8Array(result.bytes)
}

/**
 * Incremental hasher
 */
export class Hasher {

  constructor(
    readonly inner = new sha3Wasm.Keccak256Hasher()
  ) { }

  /**
   * Clone the hasher and its internal state
   * @returns 
   */
  clone(): Hasher {
    return new Hasher(this.inner.clone())
  }

  /**
   * Update the hasher with new data
   * @param data 
   * @returns 
   */
  update(data: Uint8Array): this {
    const { Memory } = sha3Wasm

    this.inner.update(new Memory(data))

    return this
  }

  /**
   * Finalize the hasher and return the digest
   * @returns 
   */
  finalize(): Uint8Array<ArrayBuffer> {
    return new Uint8Array(this.inner.finalize().bytes)
  }

}