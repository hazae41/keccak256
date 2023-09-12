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

```bash
npm i @hazae41/morax
```

```typescript
import { Keccak256 } from "@hazae41/keccak256"

Keccak256.set(await Keccak256.fromMorax())
```

### Noble (JavaScript)

```bash
npm i @noble/hashes
```

```typescript
import { Keccak256 } from "@hazae41/keccak256"

Keccak256.set(Keccak256.fromNoble())
```

## Usage

### Direct

```tsx
const hashed: Uint8Array = Keccak256.get().tryHash(new Uint8Array([1,2,3,4,5])).unwrap().copyAndDispose()
```

### Incremental

```tsx
const hasher = Keccak256.get().Hasher.tryNew().unwrap()
hasher.tryUpdate(new Uint8Array([1,2,3,4,5])).unwrap()
const hashed: Uint8Array = hasher.tryFinalize().unwrap().copyAndDispose()
```