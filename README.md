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

### Morax (WebAssembly)

```typescript
import { Keccak256 } from "@hazae41/keccak256"
import { Morax } from "@hazae41/morax"

await Morax.initBundledOnce()

/**
 * Create an instance from Morax
 **/
const keccak256 = Keccak256.fromMorax(Morax)

/**
 * Set it globally (optional)
 **/
Keccak256.set(keccak256)
```

### Noble (JavaScript)

```typescript
import { Keccak256 } from "@hazae41/keccak256"
import * as noble_sha3 from "@noble/hashes/sha3"

/**
 * Create an instance from Noble
 **/
const keccak256 = Keccak256.fromNoble(noble_sha3.keccak_256)

/**
 * Set it globally (optional)
 **/
Keccak256.set(keccak256)
```

## Usage

### Direct

```tsx
const hashed: Uint8Array = keccak256.tryHash(new Uint8Array([1,2,3,4,5])).unwrap().copy()
```

### Incremental

```tsx
const hasher = keccak256.Hasher.tryNew().unwrap()
hasher.tryUpdate(new Uint8Array([1,2,3,4,5])).unwrap()
const hashed: Uint8Array = hasher.tryFinalize().unwrap().copy()
```