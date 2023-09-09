import { Morax } from "@hazae41/morax"
import { assert, test } from "@hazae41/phobos"
import * as noble_sha3 from "@noble/hashes/sha3"
import { fromMorax } from "./morax.js"
import { fromNoble } from "./noble.js"

test("direct", async ({ message }) => {
  const noble = fromNoble(noble_sha3.keccak_256)
  const aaa = noble.tryHash(new Uint8Array([1, 2, 3, 4, 5, 6])).unwrap().copyAndDispose()

  await Morax.initBundledOnce()
  const morax = fromMorax(Morax)
  const bbb = morax.tryHash(new Uint8Array([1, 2, 3, 4, 5, 6])).unwrap().copyAndDispose()

  assert(Buffer.from(aaa).equals(Buffer.from(bbb)))
})

test("incremental", async ({ message }) => {
  const noble = fromNoble(noble_sha3.keccak_256)
  const nobleh = noble.Hasher.tryNew().unwrap()
  nobleh.tryUpdate(new Uint8Array([1, 2, 3, 4, 5, 6])).unwrap()
  nobleh.tryUpdate(new Uint8Array([1, 2, 3, 4, 5, 6])).unwrap()
  const aaa = nobleh.tryFinalize().unwrap().copyAndDispose()

  await Morax.initBundledOnce()
  const morax = fromMorax(Morax)
  const moraxh = morax.Hasher.tryNew().unwrap()
  moraxh.tryUpdate(new Uint8Array([1, 2, 3, 4, 5, 6])).unwrap()
  moraxh.tryUpdate(new Uint8Array([1, 2, 3, 4, 5, 6])).unwrap()
  const bbb = moraxh.tryFinalize().unwrap().copyAndDispose()

  assert(Buffer.from(aaa).equals(Buffer.from(bbb)))
})