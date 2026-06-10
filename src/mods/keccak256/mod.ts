import { keccak256, Keccak256Hasher, load, Memory } from "@hazae41/sha3-wasm";

await load()

/**
 * Digest the given data
 * @param data 
 * @returns 
 */
export function digest(data: Uint8Array): Uint8Array<ArrayBuffer> {
  return new Uint8Array(keccak256(new Memory(data)).bytes)
}

/**
 * Incremental hasher
 */
export class Hasher {

  constructor(
    readonly inner = new Keccak256Hasher()
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
  update(data: Uint8Array): void {
    this.inner.update(new Memory(data))
  }

  /**
   * Finalize the hasher and return the digest
   * @returns 
   */
  finalize(): Uint8Array<ArrayBuffer> {
    return new Uint8Array(this.inner.finalize().bytes)
  }

}