import { test } from "@hazae41/phobos";
import { keccak256 } from "../mod.ts";

test("direct", () => {
  const data = new TextEncoder().encode("Lorem ipsum dolor sit amet.")
  const hash = keccak256.digest(data)

  console.log(hash)
})

test("incremental", () => {
  const hasher = new keccak256.Hasher()

  hasher.update(crypto.getRandomValues(new Uint8Array(100)))

  console.log(hasher.clone().finalize())

  hasher.update(crypto.getRandomValues(new Uint8Array(100)))

  console.log(hasher.clone().finalize())

  hasher.update(crypto.getRandomValues(new Uint8Array(100)))

  console.log(hasher.finalize())
})