import "@hazae41/symbol-dispose-polyfill"

import { assert, test } from "@hazae41/phobos"
import { fromNoble } from "./noble.js"
import { fromWasm } from "./wasm.js"

import { Sha3Wasm } from "@hazae41/sha3.wasm"
import * as Sha3Noble from "@noble/hashes/sha3"

test("direct", async ({ message }) => {
  const noble = fromNoble(Sha3Noble)

  using aaa = noble.hashOrThrow(new Uint8Array([1, 2, 3, 4, 5, 6]))

  await Sha3Wasm.initBundled()

  const morax = fromWasm(Sha3Wasm)

  using bbb = morax.hashOrThrow(new Uint8Array([1, 2, 3, 4, 5, 6]))

  assert(Buffer.from(aaa.bytes).equals(Buffer.from(bbb.bytes)))
})

test("incremental", async ({ message }) => {
  const noble = fromNoble(Sha3Noble)

  using nobleh = noble.Hasher.createOrThrow()
  nobleh.updateOrThrow(new Uint8Array([1, 2, 3, 4, 5, 6]))
  nobleh.updateOrThrow(new Uint8Array([1, 2, 3, 4, 5, 6]))

  using aaa = nobleh.finalizeOrThrow()

  await Sha3Wasm.initBundled()

  const morax = fromWasm(Sha3Wasm)

  using moraxh = morax.Hasher.createOrThrow()
  moraxh.updateOrThrow(new Uint8Array([1, 2, 3, 4, 5, 6]))
  moraxh.updateOrThrow(new Uint8Array([1, 2, 3, 4, 5, 6]))

  using bbb = moraxh.finalizeOrThrow()

  assert(Buffer.from(aaa.bytes).equals(Buffer.from(bbb.bytes)))
})