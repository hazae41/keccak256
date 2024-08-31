# Keccak256

Keccak-256 adapter for WebAssembly and JS implementations

```bash
npm i @hazae41/keccak256
```

[**Node Package 📦**](https://www.npmjs.com/package/@hazae41/keccak256)

## Features

### Current features
- 100% TypeScript and ESM
- No external dependencies

## Getting started

### WebAssembly

```bash
npm i @hazae41/sha3.wasm
```

```typescript
import { Keccak256 } from "@hazae41/keccak256"
import { Sha3Wasm } from "@hazae41/sha3.wasm"

await Sha3Wasm.initBundled()

Keccak256.set(Keccak256.fromWasm(Sha3Wasm))
```

### Noble (JavaScript)

```bash
npm i @noble/hashes
```

```typescript
import { Keccak256 } from "@hazae41/keccak256"
import Sha3Noble from "@noble/hashes/sha3"

Keccak256.set(Keccak256.fromNoble(Sha3Noble))
```

## Usage

### Direct

```tsx
using hashed: Copiable = Keccak256.get().getOrThrow().hashOrThrow(new Uint8Array([1,2,3,4,5]))
const hashed2: Uint8Array = hashed.bytes.slice()
```

### Incremental

```tsx
using hasher: Keccak256.Hasher = Keccak256.get().getOrThrow().Hasher.createOrThrow()
hasher.updateOrThrow(new Uint8Array([1,2,3,4,5]))
hasher.updateOrThrow(new Uint8Array([6,7,8,9,10]))

using hashed: Copiable = hasher.finalizeOrThrow()
const hashed2: Uint8Array = hashed.bytes.slice()
```