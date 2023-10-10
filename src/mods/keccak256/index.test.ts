import { Box, Copied } from "@hazae41/box"
import { assert, test } from "@hazae41/phobos"
import { fromMorax } from "./morax.js"
import { fromNoble } from "./noble.js"

test("direct", async ({ message }) => {
  const noble = fromNoble()
  const aaa = noble.tryHash(new Box(new Copied(new Uint8Array([1, 2, 3, 4, 5, 6])))).unwrap().copyAndDispose()

  const morax = await fromMorax()
  const bbb = morax.tryHash(new Box(new Copied(new Uint8Array([1, 2, 3, 4, 5, 6])))).unwrap().copyAndDispose()

  assert(Buffer.from(aaa.bytes).equals(Buffer.from(bbb.bytes)))
})

test("incremental", async ({ message }) => {
  const noble = fromNoble()
  const nobleh = noble.Hasher.tryNew().unwrap()
  nobleh.tryUpdate(new Box(new Copied(new Uint8Array([1, 2, 3, 4, 5, 6])))).unwrap()
  nobleh.tryUpdate(new Box(new Copied(new Uint8Array([1, 2, 3, 4, 5, 6])))).unwrap()
  const aaa = nobleh.tryFinalize().unwrap().copyAndDispose()

  const morax = await fromMorax()
  const moraxh = morax.Hasher.tryNew().unwrap()
  moraxh.tryUpdate(new Box(new Copied(new Uint8Array([1, 2, 3, 4, 5, 6])))).unwrap()
  moraxh.tryUpdate(new Box(new Copied(new Uint8Array([1, 2, 3, 4, 5, 6])))).unwrap()
  const bbb = moraxh.tryFinalize().unwrap().copyAndDispose()

  assert(Buffer.from(aaa.bytes).equals(Buffer.from(bbb.bytes)))
})